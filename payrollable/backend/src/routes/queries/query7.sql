--Figure out exact amount of each deduction for a given employee for a given payroll (PayrollDeductionHistory Table)
SELECT * --SELECT selects which columns to display, in this case it is all columns
FROM PayrollDeductionHistory --FROM chooses which table, in this case its PayrollDeductionHistory.
WHERE PayrollID = 1001 --WHERE restricts the display behind a filter, we filter this query if PayrollID is 1001.
ORDER BY Amount DESC; --ORDER BY selects a column to sort by, DESC means that we sort the column by descending values
