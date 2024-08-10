function calculateSheepAge(results) {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
    const currentYear = today.getFullYear();

    results.forEach((sheep) => {
        const birthDate = new Date(sheep.تاريخ_الميلاد);
        const birthMonth = birthDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
        const birthYear = birthDate.getFullYear();

        let ageInMonths = (currentYear - birthYear) * 12 + currentMonth - birthMonth;
        let remainingDays = today.getDate() - birthDate.getDate();

        const daysInBirthMonth = new Date(birthYear, birthMonth, 0).getDate();

        if (remainingDays < 0) {
            ageInMonths--;
            remainingDays += daysInBirthMonth;
        }
          
        if(remainingDays <=10){
            sheep.العمر = `${ageInMonths} أشهر و ${remainingDays} أيام`;
        }else
        sheep.العمر = `${ageInMonths} أشهر و ${remainingDays} يوم`;
    });
}

module.exports = calculateSheepAge;
