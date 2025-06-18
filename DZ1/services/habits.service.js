import { readDatabase, writeDatabase } from '../models/database.model.js';

export function getAllHabits () {
    return readDatabase();
}

export function addHabitService (habitData) {
    const habits = readDatabase();
    const newHabit = {
        id: Date.now(),
        name: habitData.name,
        freq: habitData.freq,
        createdAt: new Date().toISOString(),
        doneDates: []
    };

    habits.push(newHabit);
    writeDatabase(habits);

    return newHabit;
}

export function markHabitDone (id) {
    const habits = readDatabase();
    const habit = habits.find(habit => habit.id === Number(id));
    const today = getTodayString();

    if (!habit) {
        return {error: 'Habit not found'};
    }

    habit.doneDates.push(today);
    writeDatabase(habits);

    return {success: true, habit};
}

export function updateHabitService ({id, name, freq}) {
    const habits = readDatabase();
    const habit = habits.find(habit => habit.id === Number(id));

    if (!habit) {
        return {error: 'Habit not found'};
    }

    if (name) {
        habit.name = name;
    }

    if (freq) {
        habit.freq = freq;
    }

    writeDatabase(habits);

    return {success: true, habit};
}

export function deleteHabitService (id) {
    const habits = readDatabase();
    const index = habits.findIndex(habit => habit.id === Number(id));

    if (index === -1) {
        return {error: 'Habit not found'};
    }

    habits.splice(index, 1);
    writeDatabase(habits);

    return {success: true};
}

export function getStatsService (days = 7) {
    const today = new Date();
    const habits = readDatabase();

    return habits.map(habit => {
        const doneDates = habit.doneDates || [];
        const createdAt = habit.createdAt;

        const recentDone = doneDates.filter(dateStr => {
            const date = new Date(dateStr);
            const diff = Math.floor((today - date) / (1000 * 60 * 60 * 24));
            return diff >= 0 && diff < days;
        });

        const expected = countExpectedRepeats(habit.freq, createdAt, today, days);
        const completed = recentDone.length;
        const percent = expected === 0 ? 0 : Math.round((completed / expected) * 100);

        return {
            id: habit.id,
            name: habit.name,
            freq: habit.freq,
            'Total attempts': expected,
            'Done': completed,
            'Completion': `${percent}%`
        };
    });
}

function getTodayString () {
    const nowDate = new Date();
    const shift = parseInt(process.env.DATE_SHIFT) || 0;

    nowDate.setDate(nowDate.getDate() + shift);

    return nowDate.toISOString().split('T')[0];
}

function countExpectedRepeats(freq, createdAt, today, days) {
    const created = new Date(createdAt);
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - days + 1);

    const effectiveStart = created > startDate ? created : startDate;
    const diffDays = Math.floor((today - effectiveStart) / (1000 * 60 * 60 * 24)) + 1;

    switch (freq) {
        case 'daily':
            return diffDays;

        case 'weekly':
            return Math.ceil(diffDays / 7);

        case 'monthly':
            return Math.ceil(diffDays / 30);

        default:
            return 0;
    }
}