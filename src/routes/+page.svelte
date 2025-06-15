<script>
  import { goto } from '$app/navigation';
  let participantId = '';
  let submitted = false;

  function handleSubmit() {
    if (participantId.trim()) {
      submitted = true;
      // Store participant ID in localStorage
      localStorage.setItem('participantId', participantId);
      // Navigate to instructions page
      goto('/instructions');
    }
  }
</script>

<main class="container">
  <div class="welcome-card">
    <h1>Welcome to the Study</h1>
    <p>Thank you for participating in our research study. To begin, please enter your participant ID below.</p>
    
    {#if !submitted}
      <form on:submit|preventDefault={handleSubmit} class="form">
        <div class="input-group">
          <label for="participantId">Participant ID:</label>
          <input
            type="text"
            id="participantId"
            bind:value={participantId}
            placeholder="Enter your participant ID"
            required
          />
        </div>
        <button type="submit">Start Study</button>
      </form>
    {:else}
      <p class="success-message">Thank you! Your participant ID has been recorded.</p>
    {/if}
  </div>
</main>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 1rem;
    background-color: #f5f5f5;
  }

  .welcome-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
  }

  h1 {
    color: #333;
    margin-bottom: 1rem;
    text-align: center;
  }

  p {
    color: #666;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-weight: 500;
    color: #333;
  }

  input {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  input:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }

  button {
    background-color: #4a90e2;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #357abd;
  }

  .success-message {
    color: #28a745;
    text-align: center;
    font-weight: 500;
  }
</style>
