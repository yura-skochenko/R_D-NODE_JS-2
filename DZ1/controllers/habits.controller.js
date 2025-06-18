import { getAllHabits, addHabitService, markHabitDone, updateHabitService, deleteHabitService, getStatsService } from '../services/habits.service.js';

export function getListHabits () {
    const habits = getAllHabits();

    if (habits.length === 0) {
        return {success: true, data: [], message: 'No habits found'};
    }

    const list = habits.map(habit => ({
        ID: habit.id,
        Name: habit.name,
        Frequency: habit.freq,
        Done: habit.doneDates?.length || 0
    }));

    return {success: true, data: list};
}

export function addHabit(habit) {
    try {
        const newHabit = addHabitService(habit);

        return {success: true, habit: newHabit};
    } catch (error) {
        return {success: false, error: error.message};
    }
}

export function doneHabit (habit) {
    const habitDone = markHabitDone(habit.id);

    if (habitDone.error) {
        return {success: false, error: habitDone.error};
    }

    return {success: true, habit: habitDone.habit};
}

export function updateHabit (habit) {
    const {id, name, freq} = habit;
    const habitUpdate = updateHabitService({id, name, freq});

    if (habitUpdate.error) {
        return {success: false, error: habitUpdate.error};
    }

    return {success: true, habit: habitUpdate.habit};
}

export function deleteHabit (habit) {
    const {id} = habit;
    const habitDelete = deleteHabitService(id);

    if (habitDelete.error) {
        return {success: false, error: habitDelete.error};
    }

    return {success: true};
}

export function showStats () {
    const stats = getStatsService();

    if (stats.length === 0) {
        return {success: true, data: [], message: 'No habits found'};
    }

    return {success: true, data: stats};
}
