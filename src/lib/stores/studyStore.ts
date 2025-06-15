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
    currentSet: number;  // 1 for first set, 2 for second set
}

export const studyStore = writable<StudyStore>({
    rounds: [],
    currentRound: 0,
    totalRounds: 3,
    usedItems: [],
    currentSet: 1
});

export function startStudy() {
    studyStore.update(store => ({
        rounds: [],
        currentRound: 0,
        totalRounds: 3,
        usedItems: [],
        currentSet: 1
    }));
}

export function startNewRound() {
    studyStore.update(store => {
        if (store.currentRound >= store.totalRounds) {
            return store;
        }
        const newRound = {
            startTime: Date.now(),
            endTime: null,
            timeTaken: null,
            selectedItem: null,
            correctItem: null,
            isCorrect: false
        };
        
        // If we're in the second set, update the existing round instead of adding a new one
        if (store.currentSet === 2 && store.rounds.length > 3) {
            const updatedRounds = [...store.rounds];
            updatedRounds[store.currentRound + 3] = newRound;
            return {
                ...store,
                currentRound: store.currentRound + 1,
                rounds: updatedRounds
            };
        }
        
        return {
            ...store,
            currentRound: store.currentRound + 1,
            rounds: [...store.rounds, newRound]
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
        const roundIndex = store.currentSet === 2 ? store.currentRound + 2 : store.currentRound - 1;
        updatedRounds[roundIndex] = {
            ...updatedRounds[roundIndex],
            endTime,
            timeTaken: endTime - (updatedRounds[roundIndex].startTime || endTime),
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

export function startSecondSet() {
    studyStore.update(store => {
        // Only initialize new rounds if we haven't already
        if (store.rounds.length <= 3) {
            const newRounds = Array(3).fill(null).map(() => ({
                startTime: Date.now(),
                endTime: null,
                timeTaken: null,
                selectedItem: null,
                correctItem: null,
                isCorrect: false
            }));
            
            return {
                ...store,
                currentRound: 0,
                currentSet: 2,
                rounds: [...store.rounds, ...newRounds] // Append new rounds to existing ones
            };
        }
        return store;
    });
} 