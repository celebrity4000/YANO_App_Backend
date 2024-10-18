const UserDoctor = require("../models/UserDoctor");
const UserPatient = require("../models/UserPatient");

exports.getDashboardData = async (req, res) => {
  try {
    const patientData = await UserPatient.find();
    const doctorData = await UserDoctor.find();

    const allUsers = [...patientData, ...doctorData];

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Previous month
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousMonthYear =
      currentMonth === 0 ? currentYear - 1 : currentYear;

    // Filter users by creation date for current and previous months
    const currentMonthNewUsers = allUsers.filter((user) => {
      const createdDate = new Date(user.createdAt);
      return (
        createdDate.getMonth() === currentMonth &&
        createdDate.getFullYear() === currentYear
      );
    });

    const previousMonthNewUsers = allUsers.filter((user) => {
      const createdDate = new Date(user.createdAt);
      return (
        createdDate.getMonth() === previousMonth &&
        createdDate.getFullYear() === previousMonthYear
      );
    });

    // Calculate percentage increase/decrease in new users since last month
    const newUsersPercentageChange = calculatePercentageChange(
      previousMonthNewUsers.length,
      currentMonthNewUsers.length
    );

    // Filter active users
    const activeUsers = allUsers.filter((user) => user.isActive);

    // Filter active users by current and previous month
    const currentMonthActiveUsers = activeUsers.filter((user) => {
      const createdDate = new Date(user.createdAt);
      return (
        createdDate.getMonth() === currentMonth &&
        createdDate.getFullYear() === currentYear
      );
    });

    const previousMonthActiveUsers = activeUsers.filter((user) => {
      const createdDate = new Date(user.createdAt);
      return (
        createdDate.getMonth() === previousMonth &&
        createdDate.getFullYear() === previousMonthYear
      );
    });

    // Calculate percentage increase/decrease in active users since last month
    const activeUsersPercentageChange = calculatePercentageChange(
      previousMonthActiveUsers.length,
      currentMonthActiveUsers.length
    );

    // Return the data
    res.status(200).json({
      totalNewUsers: currentMonthNewUsers.length,
      newUsersPercentageChange,
      totalActiveUsers: activeUsers.length,
      activeUsersPercentageChange,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to calculate percentage change
const calculatePercentageChange = (previousValue, currentValue) => {
  if (previousValue === 0 && currentValue === 0) {
    return 0;
  } else if (previousValue === 0) {
    return 100;
  } else {
    return ((currentValue - previousValue) / previousValue) * 100;
  }
};
