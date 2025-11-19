--List bonuses by employee (Bonus table)
SELECT b.EmployeeID, e.FirstName, e.LastName, b.BonusType, b.Amount, b.DateGranted --SELECT selects which columns to display, in this case it is all columns
FROM Bonus b --FROM chooses which table, in this case its Bonus.
JOIN Employee e ON b.EmployeeID = e.EmployeeID --JOIN chooses another table to combine into one table, in this case its Employee, the 'e' beside it references Employee by the variable we choose.
ORDER BY b.amount; --ORDER BY selects a column to sort by.