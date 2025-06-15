import { writable, get } from 'svelte/store';
import { STUDY_CONFIG } from '$lib/config';

interface StudyRound {
    startTime: number;
    endTime: number;
    timeTaken: number;
    selectedItem: string;
    correctItem: string;
    isCorrect: boolean;
    block: number;
    set: number;
    round: number;
}

interface StudyStore {
    currentRound: number;
    totalRounds: number;
    usedItems: string[];
    currentSet: number;
    currentBlock: number;
    totalBlocks: number;
    completedRounds: StudyRound[];
    roundStartTime: number | null;
}

export const studyStore = writable<StudyStore>({
    currentRound: 0,
    totalRounds: STUDY_CONFIG.totalRounds,
    usedItems: [],
    currentSet: 1,
    currentBlock: 1,
    totalBlocks: STUDY_CONFIG.totalBlocks,
    completedRounds: [],
    roundStartTime: null
});

export function startStudy() {
    studyStore.update(store => ({
        currentRound: 0,
        totalRounds: STUDY_CONFIG.totalRounds,
        usedItems: [],
        currentSet: 1,
        currentBlock: 1,
        totalBlocks: STUDY_CONFIG.totalBlocks,
        completedRounds: [],
        roundStartTime: null
    }));
}

export function startNewRound() {
    studyStore.update(state => ({
        ...state,
        currentRound: state.currentRound + 1,
        roundStartTime: Date.now()
    }));
}

export function startSecondSet() {
    studyStore.update(store => ({
        ...store,
        currentRound: 0,
        currentSet: 2,
        roundStartTime: null
    }));
}

export function startNewBlock() {
    studyStore.update(state => ({
        ...state,
        currentBlock: state.currentBlock + 1,
        currentRound: 0,
        currentSet: 1,
        roundStartTime: null
    }));
}

export function endRound(selectedItem: string, correctItem: string) {
    const endTime = Date.now();
    studyStore.update(store => {
        if (!store.roundStartTime) {
            console.error('No start time recorded for round');
            return store;
        }

        const timeTaken = endTime - store.roundStartTime;
        
        const completedRound: StudyRound = {
            startTime: store.roundStartTime,
            endTime,
            timeTaken,
            selectedItem,
            correctItem,
            isCorrect: selectedItem === correctItem,
            block: store.currentBlock,
            set: store.currentSet,
            round: store.currentRound
        };

        return {
            ...store,
            completedRounds: [...store.completedRounds, completedRound],
            usedItems: [...store.usedItems, correctItem],
            roundStartTime: null
        };
    });
}

export function getStudyResults(): StudyStore {
    return get(studyStore);
}

export function isItemUsed(item: string): boolean {
    const store = get(studyStore);
    return store.usedItems.includes(item);
} 