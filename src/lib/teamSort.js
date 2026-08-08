export function getRoleRank(trainer) {
  const title = (trainer.position_title || '').toLowerCase();
  const role = (trainer.role || '').toLowerCase();
  const combined = `${title} ${role}`;

  // Rank 0: Manager (Manager, Admin & HR)
  if (combined.includes('manager') || combined.includes('admin') || combined.includes('hr')) {
    return 0;
  }

  // Rank 1: Senior Trainer
  if (combined.includes('senior trainer') || combined.includes('head trainer')) {
    return 1;
  }

  // Rank 3: Group Fitness Instructor / Group Training Specialist / Yoga / Zumba
  if (
    combined.includes('group fitness') ||
    combined.includes('group instructor') ||
    combined.includes('group training') ||
    combined.includes('yoga') ||
    combined.includes('zumba')
  ) {
    return 3;
  }

  // Rank 4: Assistant Trainer
  if (combined.includes('assistant trainer') || combined.includes('assistant')) {
    return 4;
  }

  // Rank 5: Personal Trainer / Personal Training
  if (combined.includes('personal trainer') || combined.includes('personal training') || combined.includes('personal')) {
    return 5;
  }

  // Rank 2: Trainer / Gym Instructor / Fitness Coach
  if (combined.includes('trainer') || combined.includes('instructor') || combined.includes('coach')) {
    return 2;
  }

  // Rank 6: Nutritionist
  if (combined.includes('nutritionist') || combined.includes('diet')) {
    return 6;
  }

  // Rank 7: Front Desk Receptionist / Front Desk Officer
  if (combined.includes('front desk') || combined.includes('receptionist') || combined.includes('reception')) {
    return 7;
  }

  // Rank 8: Customer Service Representative
  if (combined.includes('customer service')) {
    return 8;
  }

  // Rank 9: Sales Representative
  if (combined.includes('sales')) {
    return 9;
  }

  // Rank 10: Security Personnel
  if (combined.includes('security')) {
    return 10;
  }

  // Rank 11: Spotter
  if (combined.includes('spotter')) {
    return 11;
  }

  // Rank 12: Cleaning Staff
  if (combined.includes('clean') || combined.includes('janitor')) {
    return 12;
  }

  // Rank 13: Maintenance Staff
  if (combined.includes('maintenance')) {
    return 13;
  }

  // Rank 14: Marketing Specialist
  if (combined.includes('marketing')) {
    return 14;
  }

  // Rank 15: Office Staff
  if (combined.includes('office')) {
    return 15;
  }

  return 999;
}

export function sortTrainers(trainersList) {
  if (!Array.isArray(trainersList)) return [];
  return [...trainersList].sort((a, b) => {
    const rankA = getRoleRank(a);
    const rankB = getRoleRank(b);
    if (rankA !== rankB) {
      return rankA - rankB;
    }
    return (a.full_name || '').localeCompare(b.full_name || '');
  });
}
