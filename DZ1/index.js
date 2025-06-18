import {addHabit, getListHabits, doneHabit, updateHabit, deleteHabit, showStats} from './controllers/habits.controller.js';
import {loadEnv} from './utils/env.js';

const [, , command, ...arrayArgs] = process.argv;

function parseArguments (args) {
    const result = {};

    for (let i = 0; i < args.length; i += 2) {
        const key = args[i].replace(/^--/, '');
        result[key] = args[i + 1];
    }

    return result;
}

function init () {
    switch (command) {
        case 'add': {
            const addResult = addHabit(parseArguments(arrayArgs));

            if (addResult.success) {
                console.log('Habit added');
            } else {
                console.error('Error adding habit:', addResult.error);
            }

            break;
        }

        case 'done': {
            const doneResult = doneHabit(parseArguments(arrayArgs));

            if (doneResult.success) {
                console.log('Habit marked as completed');
            } else {
                console.error('Error:', doneResult.error);
            }

            break;
        }

        case 'list': {
            const listResult = getListHabits();

            if (listResult.success && listResult.data.length > 0) {
                console.table(listResult.data);
            } else if (listResult.message) {
                console.log(listResult.message);
            }

            break;
        }

        case 'update': {
            const updateResult = updateHabit(parseArguments(arrayArgs));

            if (updateResult.success) {
                console.log('Habit updated:');
                console.table([updateResult.habit]);
            } else {
                console.error('Error updating habit:', updateResult.error);
            }

            break;
        }

        case 'delete': {
            const deleteResult = deleteHabit(parseArguments(arrayArgs));

            if (deleteResult.success) {
                console.log('Habit deleted');
            } else {
                console.error('Error deleting habit:', deleteResult.error);
            }

            break;
        }

        case 'stats': {
            const statsResult = showStats();

            if (statsResult.success && statsResult.data.length > 0) {
                console.table(statsResult.data);
            } else if (statsResult.message) {
                console.log(statsResult.message);
            }

            break;
        }

        default: {
            console.log(`${command} - not found`);

            break;
        }
    }
}

loadEnv();
init();