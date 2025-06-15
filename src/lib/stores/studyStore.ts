import { writable } from 'svelte/store';

interface StudyRound {
    startTime: number | null;
    endTime: number | null;
    timeTaken: number | null;
    selectedItem: string | null;
    correctItem: string | null;
    isCorrect: boolean;
}

interface StudyStore {
    rounds: StudyRound[];
    currentRound: number;
    totalRounds: number;
    usedItems: string[];
}

export const studyStore = writable<StudyStore>({
    rounds: [],
    currentRound: 0,
    totalRounds: 3,
    usedItems: []
});

export function startStudy() {
    studyStore.update(store => ({
        rounds: [],
        currentRound: 0,
        totalRounds: 3,
        usedItems: []
    }));
}

export function startNewRound() {
    studyStore.update(store => {
        if (store.currentRound >= store.totalRounds) {
            return store;
        }
        return {
            ...store,
            currentRound: store.currentRound + 1,
            rounds: [...store.rounds, {
                startTime: Date.now(),
                endTime: null,
                timeTaken: null,
                selectedItem: null,
                correctItem: null,
                isCorrect: false
            }]
        };
    });
}

export function endRound(selectedItem: string, correctItem: string) {
    const endTime = Date.now();
    studyStore.update(store => {
        if (store.currentRound === 0 || !store.rounds[store.currentRound - 1]) {
            throw new Error('No active round');
        }
        const updatedRounds = [...store.rounds];
        updatedRounds[store.currentRound - 1] = {
            ...updatedRounds[store.currentRound - 1],
            endTime,
            timeTaken: endTime - (updatedRounds[store.currentRound - 1].startTime || endTime),
            selectedItem,
            correctItem,
            isCorrect: selectedItem === correctItem
        };
        return {
            ...store,
            rounds: updatedRounds,
            usedItems: [...store.usedItems, correctItem]
        };
    });
}

export function getStudyResults(): StudyStore {
    let store: StudyStore;
    studyStore.subscribe(value => {
        store = value;
    })();
    return store!;
}

export function isItemUsed(item: string): boolean {
    let store: StudyStore;
    studyStore.subscribe(value => {
        store = value;
    })();
    return store!.usedItems.includes(item);
} 