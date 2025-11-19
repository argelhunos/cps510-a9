--List employees who worked overtime in descending order (Attendance table)
SELECT a.EmployeeID, DateWorked, HoursWorked, OvertimeHours --SELECT selects which columns to display, in this case it is all columns
FROM Attendance a --FROM chooses which table, in this case its Attendance.
WHERE a.OvertimeHours > 0 --WHERE restricts the display behind a filter, we filter this query if OvertimeHours in Attendance is greater than 0.
ORDER BY DateWorked DESC; --ORDER BY selects a column to sort by, DESC means that we sort the column by descending values, in this case we sort DateWorked from most recent to oldest.
