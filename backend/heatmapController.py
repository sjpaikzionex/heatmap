import pyodbc
import pandas as pd
import numpy as np

class HeatMapController:
    def __init__(self, start_date, end_date):
        self.start_date = start_date
        self.end_date = end_date
        self.df = self.get_data()
        self.df_stat = self.get_stat()
        self.binned = {}
        self.targets = pd.DataFrame()

    def set_dates(self, dates):
        self.start_date = dates['fromDate']
        self.end_date = dates['toDate']

    def get_data(self):
        data_qry = f"""
            SELECT I.ITEM_CD
                , A.ACCOUNT_CD
                , IAS.BASE_DATE
                , IAS.QTY
            FROM TB_CM_ACTUAL_SALES IAS
                INNER JOIN
                TB_CM_ITEM_MST I
                ON I.ID = IAS.ITEM_MST_ID
                INNER JOIN
                TB_DP_ACCOUNT_MST A
                ON A.ID = IAS.ACCOUNT_ID
            WHERE IAS.BASE_DATE BETWEEN '{self.start_date}' AND '{self.end_date}'
        """

        conn = pyodbc.connect(
            'DRIVER={ODBC DRIVER 17 for SQL Server};'
            'SERVER={192.168.3.21};'
            'DATABASE={T3SMARTSCM_DEV};'
            'UID={sa};'
            'PWD={vivazio};'
        )
        cur = conn.cursor()
        cur.execute(data_qry)
        data = cur.fetchall()

        df = pd.DataFrame(data=np.array(data), columns=['item_cd', 'account_cd', 'ds', 'y'])
        df['y'] = df['y'].astype(float)
        df['ds'] = pd.to_datetime(df['ds'])

        return df.sort_values(by=['item_cd', 'account_cd', 'ds'])

    @staticmethod
    def stat_func(x):
        return pd.Series(
            {
                'sum': x['y'].sum(),
                'mean': x['y'].mean(),
                'count': x['y'].count(),
                'cov': x['y'].std() / (x['y'].mean() if x['y'].mean() != 0 else 1)
            }
        )

    def get_stat(self):
        df_stat = self.df.groupby(['item_cd', 'account_cd']).apply(HeatMapController.stat_func)
        df_stat.reset_index(drop=False, inplace=True)

        return df_stat.sort_values(by=['sum', 'cov', 'count'], ascending=False)

    def get_binned_info(self, sum_bin_cnt=20, cov_bin_cnt=20):
        self.df_stat.sort_values(by=['sum'], inplace=True)
        self.df_stat['pct_rank_qty'] = self.df_stat['sum'].rank(pct=True)
        self.df_stat.reset_index(drop=True, inplace=True)

        sum_bins = np.linspace(0, 1, sum_bin_cnt, endpoint=False)
        cov_bins = np.linspace(min(0, self.df_stat['cov'].min()), 2, cov_bin_cnt, endpoint=False)

        df_binned_cnt = pd.DataFrame(columns=['qty_pct'] + ['%.2f' % b for b in cov_bins])
        df_binned_cnt['qty_pct'] = [int(s * 100) for s in sum_bins]

        for i in range(len(sum_bins) - 1):
            self.binned[int(sum_bins[i] * 100)] = {}
            qty_bin = self.df_stat.loc[sum_bins[i] <= self.df_stat['pct_rank_qty']].loc[self.df_stat['pct_rank_qty'] < sum_bins[i + 1]].copy()

            for j in range(len(cov_bins) - 1):
                binned = qty_bin.loc[cov_bins[j] <= qty_bin['cov']].loc[qty_bin['cov'] < cov_bins[j + 1]].copy()
                df_binned_cnt.loc[df_binned_cnt['qty_pct'] == int(sum_bins[i] * 100), '%.2f' % cov_bins[j]] = binned.shape[0]
                self.binned[int(sum_bins[i] * 100)]['%.2f' % cov_bins[j]] = binned

            binned = qty_bin.loc[qty_bin['cov'] >= cov_bins[-1]].copy()
            df_binned_cnt.loc[df_binned_cnt['qty_pct'] == int(sum_bins[i] * 100), '%.2f' % cov_bins[-1]] = binned.shape[0]
            self.binned[int(sum_bins[i] * 100)]['%.2f' % cov_bins[-1]] = binned

        self.binned[int(sum_bins[-1] * 100)] = {}
        qty_bin = self.df_stat.loc[self.df_stat['pct_rank_qty'] >= sum_bins[-1]].copy()
        for j in range(len(cov_bins) - 1):
            binned = qty_bin.loc[cov_bins[j] <= qty_bin['cov']].loc[qty_bin['cov'] < cov_bins[j + 1]].copy()
            df_binned_cnt.loc[df_binned_cnt['qty_pct'] == int(sum_bins[-1] * 100), '%.2f' % cov_bins[j]] = binned.shape[0]
            self.binned[int(sum_bins[-1] * 100)]['%.2f' % cov_bins[j]] = binned

        binned = qty_bin[qty_bin['cov'] >= cov_bins[-1]].copy()
        df_binned_cnt.loc[df_binned_cnt['qty_pct'] == int(sum_bins[-1] * 100), '%.2f' % cov_bins[-1]] = binned.shape[0]
        self.binned[int(sum_bins[-1] * 100)]['%.2f' % cov_bins[-1]] = binned

        df_binned_cnt['pct_cnt'] = df_binned_cnt.iloc[:, 1:].apply(sum, axis=1)

        return df_binned_cnt

    def get_targets(self, json_data):
        self.targets = pd.DataFrame()
        for d in json_data:
            self.targets = pd.concat([self.targets, self.binned[d['qty_pct']][d['cov_lbl']]])

        return self.targets
