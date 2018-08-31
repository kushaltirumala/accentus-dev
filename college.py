import pandas as pd

df = pd.read_csv("data.csv")
df.columns = ['name', 'type', 'ed_date', 'edii_date','ea_date','eaii_date', 'rea', 'rd/rolling', 'fee_us', 'fee_intl', 'personal_essay_requirements','self_reported_cg', 'portfolio_supp', 'writing_supp', 'test_policy', 'sat/act', 'INTL', 'te_rec', 'oe_rec', 'mr_rec', 'cr_rec', 'saves_forms']


def get_college_list():
	return list(df['name'])

def get_college_info(college_name):
	temp = df[df['name'] == college_name]
	if temp.size is 0:
		return False
	return {val: temp.values[0][i] for i, val in enumerate(temp.columns)}
