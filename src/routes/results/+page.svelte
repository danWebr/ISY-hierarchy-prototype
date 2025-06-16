<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { studyStore } from '$lib/stores/studyStore';
  import { STUDY_CONFIG } from '$lib/config';

  let correctPicks = 0;
  let averageTime = 0;
  let participantId = '';
  let studyData: any[] = [];
  let totalRounds = STUDY_CONFIG.totalRounds;
  let totalBlocks = STUDY_CONFIG.totalBlocks;

  onMount(() => {
    // Get participant ID from localStorage
    participantId = localStorage.getItem('participantId') || 'Unknown';
    
    studyStore.subscribe(store => {
      console.log('All rounds:', store.completedRounds);
      console.log('Rounds with isCorrect:', store.completedRounds.map(r => ({ selected: r.selectedItem, correct: r.correctItem, isCorrect: r.isCorrect })));
      correctPicks = store.completedRounds.filter(round => round.isCorrect).length;
      const totalTime = store.completedRounds.reduce((sum, round) => sum + round.timeTaken, 0);
      averageTime = totalTime / store.completedRounds.length / 1000; // Convert to seconds
      studyData = store.completedRounds;
      totalRounds = store.totalRounds;
      totalBlocks = store.totalBlocks;
    })();
  });

  function handleRestart() {
    goto('/instructions');
  }

  function downloadCSV() {
    const headers = ['ParticipantID', 'Block', 'Trial', 'Technique', 'Time', 'Error'];
    const csvContent = [
      headers.join(','),
      ...studyData.map((round, index) => {
        const trialNumber = (index % (totalRounds * 2)) % totalRounds;
        const technique = index % (totalRounds * 2) < totalRounds ? '0' : '1'; // First set is mouse, second set is keyboard
        return [
          participantId,
          round.block,
          trialNumber,
          technique,
          (round.timeTaken || 0) / 1000, // Convert to seconds
          round.isCorrect ? 0 : 1
        ].join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `DaniloWeberHierarchy.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
</script>

<main class="container">
  <div class="results-card">
    <h1>Experiment Results</h1>
    
    <div class="results-content">
      <div class="result-item">
        <h2>Participant ID</h2>
        <div class="result-value">{participantId}</div>
      </div>

      <div class="result-item">
        <h2>Total Blocks Completed</h2>
        <div class="result-value">{totalBlocks}</div>
      </div>

      <div class="result-item">
        <h2>Correct Selections</h2>
        <div class="result-value">{correctPicks} out of {totalRounds * 2 * totalBlocks}</div>
      </div>
    </div>

    <div class="button-container">
      <button class="download-button" on:click={downloadCSV}>
        Download Results (CSV)
      </button>
      <button class="restart-button" on:click={handleRestart}>
        Restart Experiment
      </button>
    </div>
  </div>
</main>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 2rem;
    background-color: #f5f5f5;
  }

  .results-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
  }

  h1 {
    color: #333;
    margin-bottom: 2rem;
    text-align: center;
    font-size: 2rem;
  }

  .results-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .result-item {
    text-align: center;
  }

  h2 {
    color: #444;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  .result-value {
    font-size: 1.5rem;
    color: #28a745;
    font-weight: 500;
  }

  .button-container {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 4rem;
  }

  .download-button {
    display: block;
    width: 200px;
    padding: 1rem 2rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .download-button:hover {
    background-color: #0056b3;
  }

  .restart-button {
    display: block;
    width: 200px;
    padding: 1rem 2rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .restart-button:hover {
    background-color: #218838;
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }

    .results-card {
      padding: 1.5rem;
    }

    .button-container {
      flex-direction: column;
      align-items: center;
    }
  }
</style> 