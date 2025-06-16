<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import { studyStore, startNewRound, endRound, isItemUsed, startStudy } from '$lib/stores/studyStore';
  import { menuDemoItems, initializeRandomCategories, type MenuItem, type SubMenuItem, type SubSubMenuItem, type SubSubSubMenuItem } from '$lib/stores/menuStore';
  import { STUDY_CONFIG } from '$lib/config';

  let mainMenuItems: MenuItem[] = [];

  menuDemoItems.subscribe(items => {
    mainMenuItems = items;
  });

  let activeMenu: number | null = null;
  let activeSubMenu: string | null = null;
  let activeSubSubMenu: string | null = null;
  let selectedItem: string | null = null;
  let randomItem: string;
  let currentRound = 0;
  let totalRounds = STUDY_CONFIG.totalRounds;
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
    // Only start a new study if we're in block 1
    if (currentBlock === 1) {
      startStudy();
      startNewRound();
    } else if (currentRound === 0) {
      // If we're in a new block and haven't started a round yet
      startNewRound();
    }
    randomItem = getRandomSubSubSubItem();
  });

  // Clean up subscription when component is destroyed
  onDestroy(() => {
    unsubscribe();
  });

  function handleMenuEnter(itemId: number) {
    activeMenu = itemId;
  }

  function handleSubMenuEnter(subItemLabel: string) {
    activeSubMenu = subItemLabel;
  }

  function handleSubSubMenuEnter(subSubItemLabel: string) {
    activeSubSubMenu = subSubItemLabel;
  }

  function handleItemSelect(item: string) {
    console.log('Menu demo - Selected item:', item, 'Correct item:', randomItem, 'Current round:', currentRound);
    selectedItem = item;
    endRound(item, randomItem);
    
    if (currentRound < totalRounds) {
      // Start next round
      startNewRound();
      randomItem = getRandomSubSubSubItem();
      selectedItem = null;
      activeMenu = null;
      activeSubMenu = null;
      activeSubSubMenu = null;
    } else {
      // First set complete, go to keyboard menu demo
      console.log('First set complete, going to keyboard demo');
      goto('/keyboard-menu-demo');
    }
  }
</script>

<main class="container">
    <div class="instructions">
        <div class="selection-display">
          Please select: '{randomItem}'
        </div>
        <div class="round-info">
          <div class="progress-container" style="background: linear-gradient(to right, #4CAF50 {((currentRound - 1) / totalRounds) * 100}%, #e9ecef {((currentRound - 1) / totalRounds) * 100}%)">
            Block {currentBlock} of {totalBlocks} - Round {currentRound} of {totalRounds}
          </div>
        </div>
    </div>

    <nav class="menu-bar">
      {#each mainMenuItems as item}
        <div 
          class="menu-item {activeMenu === item.id ? 'active' : ''}" 
          on:mouseenter={() => handleMenuEnter(item.id)}
          role="menuitem"
          tabindex="0"
        >
          <span class="menu-label">{item.label}</span>
          
          {#if activeMenu === item.id}
            <div class="submenu">
              {#each item.subItems as subItem}
                <div 
                  class="submenu-item {activeSubMenu === subItem.label ? 'active' : ''}"
                  on:mouseenter={() => handleSubMenuEnter(subItem.label)}
                  role="menuitem"
                  tabindex="0"
                >
                  {subItem.label}
                  {#if activeSubMenu === subItem.label}
                    <div class="sub-submenu">
                      {#each subItem.subSubItems as subSubItem}
                        <div 
                          class="sub-submenu-item {activeSubSubMenu === subSubItem.label ? 'active' : ''}"
                          on:mouseenter={() => handleSubSubMenuEnter(subSubItem.label)}
                          role="menuitem"
                          tabindex="0"
                        >
                          {subSubItem.label}
                          {#if activeSubSubMenu === subSubItem.label}
                            <div class="sub-sub-submenu">
                              {#each subSubItem.subSubSubItems as subSubSubItem}
                                <div 
                                  class="sub-sub-submenu-item"
                                  on:click={() => handleItemSelect(subSubSubItem.label)}
                                  on:keydown={(e) => e.key === 'Enter' && handleItemSelect(subSubSubItem.label)}
                                  role="menuitem"
                                  tabindex="0"
                                >
                                  {subSubSubItem.label}
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

  .menu-bar {
    display: flex;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.5rem;
    position: relative;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .menu-item {
    padding: 0.5rem 1rem;
    cursor: pointer;
    position: relative;
    user-select: none;
  }

  .menu-item:hover,
  .menu-item.active {
    background-color: #e9ecef;
  }

  .menu-label {
    font-weight: 500;
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

  .submenu-item {
    padding: 0.5rem 1rem;
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .submenu-item:hover,
  .submenu-item.active {
    background-color: #f8f9fa;
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

  .sub-submenu-item {
    padding: 0.5rem 1rem;
    cursor: pointer;
    white-space: nowrap;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .sub-submenu-item:hover,
  .sub-submenu-item.active {
    background-color: #f8f9fa;
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
    white-space: nowrap;
  }

  .sub-sub-submenu-item:hover {
    background-color: #f8f9fa;
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
    padding: 0.25rem;
    border-radius: 4px;
    background-color: #e9ecef;
  }

  .progress-container {
    padding: 0.25rem;
    border-radius: 2px;
    text-align: center;
    font-weight: 500;
    color: #212529;
    transition: background 0.3s ease;
  }
</style> 