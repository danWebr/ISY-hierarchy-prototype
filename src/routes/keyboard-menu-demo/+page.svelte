<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { studyStore, startNewRound, endRound, isItemUsed, startSecondSet, startNewBlock } from '$lib/stores/studyStore';
  import { keyboardMenuDemoItems, initializeRandomCategories, type MenuItem, type SubMenuItem, type SubSubMenuItem, type SubSubSubMenuItem } from '$lib/stores/menuStore';
  import { STUDY_CONFIG } from '$lib/config';

  let mainMenuItems: MenuItem[] = [];

  keyboardMenuDemoItems.subscribe(items => {
    mainMenuItems = items;
  });

  let activeMenu: number | null = null;
  let activeSubMenu: string | null = null;
  let activeSubSubMenu: string | null = null;
  let selectedItem: string | null = null;
  let randomItem: string;
  let currentRound = 0;
  let totalRounds = STUDY_CONFIG.totalRounds;
  let secondSetRound = 0;  // Track rounds in second set
  let currentBlock = 1;
  let totalBlocks = STUDY_CONFIG.totalBlocks;

  // Subscribe to store changes
  const unsubscribe = studyStore.subscribe(store => {
    currentRound = store.currentRound;
    totalRounds = store.totalRounds;
    currentBlock = store.currentBlock;
    totalBlocks = store.totalBlocks;
  });

  function getRandomSubSubSubItem(): string {
    let item: string;
    do {
      // Get a random main menu item
      const randomMainItem = mainMenuItems[Math.floor(Math.random() * mainMenuItems.length)];
      // Get a random sub item
      const randomSubItem = randomMainItem.subItems[Math.floor(Math.random() * randomMainItem.subItems.length)];
      // Get a random sub sub item
      const randomSubSubItem = randomSubItem.subSubItems[Math.floor(Math.random() * randomSubItem.subSubItems.length)];
      // Get a random sub sub sub item
      const randomSubSubSubItem = randomSubSubItem.subSubSubItems[Math.floor(Math.random() * randomSubSubItem.subSubSubItems.length)];
      item = randomSubSubSubItem.label;
    } while (isItemUsed(item));
    return item;
  }

  onMount(() => {
    initializeRandomCategories();
    startSecondSet();  // Start the second set
    if (currentRound === 0) {
      startNewRound();
    }
    randomItem = getRandomSubSubSubItem();
    console.log('Keyboard demo mounted:', {
      currentRound,
      totalRounds,
      currentBlock,
      totalBlocks
    });
  });

  // Clean up subscription when component is destroyed
  onDestroy(() => {
    unsubscribe();
  });

  function handleItemSelect(item: string) {
    console.log('Keyboard demo - Selected item:', item, 'Correct item:', randomItem, 'Round:', secondSetRound + 1);
    endRound(item, randomItem);
    
    secondSetRound++;
    if (secondSetRound < totalRounds) {
      // Start next round
      startNewRound();
      randomItem = getRandomSubSubSubItem();
      activeMenu = null;
      activeSubMenu = null;
      activeSubSubMenu = null;
    } else {
      // Both mouse and keyboard rounds are complete for this block
      if (currentBlock < totalBlocks) {
        // Start a new block
        startNewBlock();
        goto('/menu-demo');
      } else {
        // All blocks complete, go to results
        goto('/results');
      }
    }
  }

  function handleKeyPress(event: KeyboardEvent) {
    const key = event.key;

    // Main menu selection
    if (activeMenu === null) {
      const maxMain = mainMenuItems.length;
      const num = parseInt(key);
      if (!isNaN(num) && num >= 1 && num <= maxMain) {
        activeMenu = mainMenuItems[num - 1].id;
        activeSubMenu = null;
        activeSubSubMenu = null;
        return;
      }
    }
    // Submenu selection
    else if (activeSubMenu === null) {
      const currentMenu = mainMenuItems.find(item => item.id === activeMenu);
      if (!currentMenu) return;
      const maxSub = currentMenu.subItems.length;
      const num = parseInt(key);
      if (!isNaN(num) && num >= 1 && num <= maxSub) {
        activeSubMenu = currentMenu.subItems[num - 1].label;
        activeSubSubMenu = null;
        return;
      }
    }
    // Sub-submenu selection
    else if (activeSubSubMenu === null) {
      const currentMenu = mainMenuItems.find(item => item.id === activeMenu);
      const currentSubMenu = currentMenu?.subItems.find(item => item.label === activeSubMenu);
      if (!currentSubMenu) return;
      const maxSubSub = currentSubMenu.subSubItems.length;
      const num = parseInt(key);
      if (!isNaN(num) && num >= 1 && num <= maxSubSub) {
        activeSubSubMenu = currentSubMenu.subSubItems[num - 1].label;
        return;
      }
    }
    // Sub-sub-submenu selection
    else if (activeSubSubMenu !== null) {
      const currentMenu = mainMenuItems.find(item => item.id === activeMenu);
      const currentSubMenu = currentMenu?.subItems.find(item => item.label === activeSubMenu);
      const currentSubSubMenu = currentSubMenu?.subSubItems.find(item => item.label === activeSubSubMenu);
      if (!currentSubSubMenu) return;
      const maxSubSubSub = currentSubSubMenu.subSubSubItems.length;
      const num = parseInt(key);
      if (!isNaN(num) && num >= 1 && num <= maxSubSubSub) {
        const selectedItem = currentSubSubMenu.subSubSubItems[num - 1].label;
        console.log('Keyboard demo - Selected item:', selectedItem, 'Correct item:', randomItem);
        endRound(selectedItem, randomItem);
        
        secondSetRound++;
        if (secondSetRound < totalRounds) {
          // Start next round
          startNewRound();
          randomItem = getRandomSubSubSubItem();
          activeMenu = null;
          activeSubMenu = null;
          activeSubSubMenu = null;
        } else {
          // Both mouse and keyboard rounds are complete for this block
          if (currentBlock < totalBlocks) {
            // Start a new block
            startNewBlock();
            goto('/menu-demo');
          } else {
            // All blocks complete, go to results
            goto('/results');
          }
        }
        return;
      }
    }

    // Handle escape key to go back one level
    if (key === 'Escape') {
      if (activeSubSubMenu !== null) {
        activeSubSubMenu = null;
      } else if (activeSubMenu !== null) {
        activeSubMenu = null;
      } else if (activeMenu !== null) {
        activeMenu = null;
      }
    }
  }
</script>

<svelte:window on:keydown={handleKeyPress}/>

<main class="container">
  <div class="instructions">
    <div class="selection-display">
      Please select: '{randomItem}'
    </div>
    <div class="round-info">
      Block {currentBlock} of {totalBlocks} - Round {secondSetRound + 1} of {totalRounds}
    </div>
  </div>

  <div class="menu-container">
    <nav class="menu-bar">
      {#each mainMenuItems as item, index}
        <div 
          class="menu-item"
          class:active={activeMenu === item.id}
        >
          <span class="menu-label">{item.label}</span>
          <span class="key-hint">{index + 1}</span>
          
          {#if activeMenu === item.id}
            <div class="submenu">
              {#each (mainMenuItems.find(item2 => item2.id === activeMenu)?.subItems ?? []) as subItem, i}
                <div class="submenu-item-wrapper">
                  <div 
                    class="submenu-item"
                    class:active={activeSubMenu === subItem.label}
                  >
                    <span>{subItem.label}</span>
                    <span class="key-hint">{i + 1}</span>
                  </div>
                  {#if activeSubMenu === subItem.label}
                    <div class="sub-submenu">
                      {#each (mainMenuItems.find(item2 => item2.id === activeMenu)?.subItems.find(item2 => item2.label === activeSubMenu)?.subSubItems ?? []) as subSubItem, j}
                        <div class="sub-submenu-item-wrapper">
                          <div 
                            class="sub-submenu-item"
                            class:active={activeSubSubMenu === subSubItem.label}
                          >
                            <span>{subSubItem.label}</span>
                            <span class="key-hint">{j + 1}</span>
                          </div>
                          {#if activeSubSubMenu === subSubItem.label}
                            <div class="sub-sub-submenu">
                              {#each (mainMenuItems.find(item2 => item2.id === activeMenu)?.subItems.find(item2 => item2.label === activeSubMenu)?.subSubItems.find(item2 => item2.label === activeSubSubMenu)?.subSubSubItems ?? []) as subSubSubItem, k}
                                <div 
                                  class="sub-sub-submenu-item"
                                  class:active={activeSubSubMenu === subSubSubItem.label}
                                >
                                  <span>{subSubSubItem.label}</span>
                                  <span class="key-hint">{k + 1}</span>
                                </div>
                              {/each}
                            </div>
                          {/if}
                        </div>
                      {/each}
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </nav>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    overflow: hidden;
  }

  :global(html) {
    overflow: hidden;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    overflow: hidden;
    padding: 2rem;
    padding-top: 25vh;
    background-color: #f5f5f5;
    gap: 2rem;
    box-sizing: border-box;
  }

  .instructions {
    background-color: white;
    padding: 1.5rem;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    margin-bottom: 1rem;
  }

  .selection-display {
    font-size: 1.2rem;
    color: #212529;
    text-align: center;
    margin-bottom: 1rem;
  }

  .round-info {
    padding: 0.5rem;
    background-color: #e9ecef;
    border-radius: 4px;
    text-align: center;
    font-weight: 500;
    color: #495057;
  }

  .menu-container {
    display: flex;
    position: relative;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .menu-bar {
    display: flex;
    gap: 1rem;
  }

  .menu-item {
    padding: 0.5rem 1rem;
    cursor: pointer;
    position: relative;
    user-select: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .menu-item.active {
    background-color: #e9ecef;
  }

  .menu-label {
    font-weight: 500;
  }

  .key-hint {
    background-color: #e9ecef;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.8rem;
    color: #495057;
  }

  .submenu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    min-width: 150px;
    z-index: 1000;
  }

  .submenu-item-wrapper {
    position: relative;
  }

  .submenu-item {
    padding: 0.5rem 1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .submenu-item.active {
    background-color: #e9ecef;
  }

  .sub-submenu {
    position: absolute;
    top: 0;
    left: 100%;
    background-color: white;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    min-width: 150px;
    z-index: 1001;
  }

  .sub-submenu-item-wrapper {
    position: relative;
  }

  .sub-submenu-item {
    padding: 0.5rem 1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .sub-submenu-item.active {
    background-color: #e9ecef;
  }

  .sub-sub-submenu {
    position: absolute;
    top: 0;
    left: 100%;
    background-color: white;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    min-width: 150px;
    z-index: 1002;
  }

  .sub-sub-submenu-item {
    padding: 0.5rem 1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .sub-sub-submenu-item.active {
    background-color: #e9ecef;
  }

</style> 