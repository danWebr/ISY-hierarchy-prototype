import { writable } from 'svelte/store';

export interface SubSubSubMenuItem {
  label: string;
}

export interface SubSubMenuItem {
  label: string;
  subSubSubItems: SubSubSubMenuItem[];
}

export interface SubMenuItem {
  label: string;
  subSubItems: SubSubMenuItem[];
}

export interface MenuItem {
  id: number;
  label: string;
  subItems: SubMenuItem[];
}

// All available menu categories
export const allMenuItems: MenuItem[] = [
  {
    id: 1,
    label: 'Gardening',
    subItems: [
      {
        label: 'Vegetables',
        subSubItems: [
          {
            label: 'Carrot',
            subSubSubItems: [
              { label: 'Nantes Carrot' },
              { label: 'Imperator Carrot' },
              { label: 'Danvers Carrot' }
            ]
          },
          {
            label: 'Lettuce',
            subSubSubItems: [
              { label: 'Romaine Lettuce' },
              { label: 'Iceberg Lettuce' },
              { label: 'Butterhead Lettuce' }
            ]
          },
          {
            label: 'Tomato',
            subSubSubItems: [
              { label: 'Cherry Tomato' },
              { label: 'Beefsteak Tomato' },
              { label: 'Plum Tomato' }
            ]
          }
        ]
      },
      {
        label: 'Flowers',
        subSubItems: [
          {
            label: 'Rose',
            subSubSubItems: [
              { label: 'Hybrid Tea Rose' },
              { label: 'Floribunda Rose' },
              { label: 'Climbing Rose' }
            ]
          },
          {
            label: 'Tulip',
            subSubSubItems: [
              { label: 'Darwin Tulip' },
              { label: 'Triumph Tulip' },
              { label: 'Parrot Tulip' }
            ]
          },
          {
            label: 'Daffodil',
            subSubSubItems: [
              { label: 'Trumpet Daffodil' },
              { label: 'Double Daffodil' },
              { label: 'Miniature Daffodil' }
            ]
          }
        ]
      },
      {
        label: 'Trees',
        subSubItems: [
          {
            label: 'Oak',
            subSubSubItems: [
              { label: 'Red Oak' },
              { label: 'White Oak' },
              { label: 'Pin Oak' }
            ]
          },
          {
            label: 'Maple',
            subSubSubItems: [
              { label: 'Sugar Maple' },
              { label: 'Red Maple' },
              { label: 'Silver Maple' }
            ]
          },
          {
            label: 'Cherry',
            subSubSubItems: [
              { label: 'Bing Cherry' },
              { label: 'Rainier Cherry' },
              { label: 'Black Cherry' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: 'Sports',
    subItems: [
      {
        label: 'Football',
        subSubItems: [
          {
            label: 'Premier League',
            subSubSubItems: [
              { label: 'Manchester United' },
              { label: 'Liverpool' },
              { label: 'Arsenal' }
            ]
          },
          {
            label: 'La Liga',
            subSubSubItems: [
              { label: 'Real Madrid' },
              { label: 'Barcelona' },
              { label: 'Atletico Madrid' }
            ]
          },
          {
            label: 'Bundesliga',
            subSubSubItems: [
              { label: 'Bayern Munich' },
              { label: 'Borussia Dortmund' },
              { label: 'RB Leipzig' }
            ]
          }
        ]
      },
      {
        label: 'Basketball',
        subSubItems: [
          {
            label: 'NBA',
            subSubSubItems: [
              { label: 'Los Angeles Lakers' },
              { label: 'Boston Celtics' },
              { label: 'Chicago Bulls' }
            ]
          },
          {
            label: 'EuroLeague',
            subSubSubItems: [
              { label: 'Real Madrid' },
              { label: 'CSKA Moscow' },
              { label: 'Fenerbahce' }
            ]
          },
          {
            label: 'Chinese CBA',
            subSubSubItems: [
              { label: 'Guangdong Southern Tigers' },
              { label: 'Xinjiang Flying Tigers' },
              { label: 'Liaoning Flying Leopards' }
            ]
          }
        ]
      },
      {
        label: 'Tennis',
        subSubItems: [
          {
            label: 'Grand Slams',
            subSubSubItems: [
              { label: 'Wimbledon' },
              { label: 'US Open' },
              { label: 'French Open' }
            ]
          },
          {
            label: 'ATP Tour',
            subSubSubItems: [
              { label: 'Australian Open' },
              { label: 'Miami Open' },
              { label: 'Indian Wells' }
            ]
          },
          {
            label: 'WTA Tour',
            subSubSubItems: [
              { label: 'WTA Finals' },
              { label: 'Dubai Tennis Championships' },
              { label: 'Madrid Open' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    label: 'Music',
    subItems: [
      {
        label: 'Rock',
        subSubItems: [
          {
            label: 'The Beatles',
            subSubSubItems: [
              { label: 'Abbey Road' },
              { label: 'Sgt. Pepper\'s' },
              { label: 'Revolver' }
            ]
          },
          {
            label: 'Queen',
            subSubSubItems: [
              { label: 'A Night at the Opera' },
              { label: 'News of the World' },
              { label: 'A Kind of Magic' }
            ]
          },
          {
            label: 'Led Zeppelin',
            subSubSubItems: [
              { label: 'Led Zeppelin IV' },
              { label: 'Physical Graffiti' },
              { label: 'Houses of the Holy' }
            ]
          }
        ]
      },
      {
        label: 'Pop',
        subSubItems: [
          {
            label: 'Michael Jackson',
            subSubSubItems: [
              { label: 'Thriller' },
              { label: 'Bad' },
              { label: 'Off the Wall' }
            ]
          },
          {
            label: 'Madonna',
            subSubSubItems: [
              { label: 'Like a Prayer' },
              { label: 'Ray of Light' },
              { label: 'True Blue' }
            ]
          },
          {
            label: 'Taylor Swift',
            subSubSubItems: [
              { label: '1989' },
              { label: 'Folklore' },
              { label: 'Midnights' }
            ]
          }
        ]
      },
      {
        label: 'Hip Hop',
        subSubItems: [
          {
            label: 'Tupac',
            subSubSubItems: [
              { label: 'All Eyez on Me' },
              { label: 'Me Against the World' },
              { label: 'The Don Killuminati' }
            ]
          },
          {
            label: 'The Notorious B.I.G.',
            subSubSubItems: [
              { label: 'Ready to Die' },
              { label: 'Life After Death' },
              { label: 'Born Again' }
            ]
          },
          {
            label: 'Jay-Z',
            subSubSubItems: [
              { label: 'The Blueprint' },
              { label: 'Reasonable Doubt' },
              { label: '4:44' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 4,
    label: 'Cooking',
    subItems: [
      {
        label: 'Italian',
        subSubItems: [
          {
            label: 'Pasta',
            subSubSubItems: [
              { label: 'Spaghetti' },
              { label: 'Fettuccine' },
              { label: 'Penne' }
            ]
          },
          {
            label: 'Pizza',
            subSubSubItems: [
              { label: 'Margherita' },
              { label: 'Pepperoni' },
              { label: 'Quattro Formaggi' }
            ]
          },
          {
            label: 'Risotto',
            subSubSubItems: [
              { label: 'Mushroom' },
              { label: 'Seafood' },
              { label: 'Saffron' }
            ]
          }
        ]
      },
      {
        label: 'Japanese',
        subSubItems: [
          {
            label: 'Sushi',
            subSubSubItems: [
              { label: 'California Roll' },
              { label: 'Salmon Nigiri' },
              { label: 'Tuna Maki' }
            ]
          },
          {
            label: 'Ramen',
            subSubSubItems: [
              { label: 'Tonkotsu' },
              { label: 'Miso' },
              { label: 'Shoyu' }
            ]
          },
          {
            label: 'Tempura',
            subSubSubItems: [
              { label: 'Shrimp' },
              { label: 'Vegetables' },
              { label: 'Mixed Seafood' }
            ]
          }
        ]
      },
      {
        label: 'Mexican',
        subSubItems: [
          {
            label: 'Tacos',
            subSubSubItems: [
              { label: 'Carne Asada' },
              { label: 'Al Pastor' },
              { label: 'Fish' }
            ]
          },
          {
            label: 'Enchiladas',
            subSubSubItems: [
              { label: 'Beef' },
              { label: 'Chicken' },
              { label: 'Cheese' }
            ]
          },
          {
            label: 'Burritos',
            subSubSubItems: [
              { label: 'Bean' },
              { label: 'Chicken' },
              { label: 'Steak' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 5,
    label: 'Movies',
    subItems: [
      {
        label: 'Drama',
        subSubItems: [
          {
            label: 'Christopher Nolan',
            subSubSubItems: [
              { label: 'Inception' },
              { label: 'The Dark Knight' },
              { label: 'Interstellar' }
            ]
          },
          {
            label: 'Martin Scorsese',
            subSubSubItems: [
              { label: 'Goodfellas' },
              { label: 'The Departed' },
              { label: 'Taxi Driver' }
            ]
          },
          {
            label: 'Quentin Tarantino',
            subSubSubItems: [
              { label: 'Pulp Fiction' },
              { label: 'Kill Bill' },
              { label: 'Django Unchained' }
            ]
          }
        ]
      },
      {
        label: 'Science Fiction',
        subSubItems: [
          {
            label: 'Ridley Scott',
            subSubSubItems: [
              { label: 'Blade Runner' },
              { label: 'Alien' },
              { label: 'The Martian' }
            ]
          },
          {
            label: 'James Cameron',
            subSubSubItems: [
              { label: 'Avatar' },
              { label: 'Terminator 2' },
              { label: 'Aliens' }
            ]
          },
          {
            label: 'Stanley Kubrick',
            subSubSubItems: [
              { label: '2001: A Space Odyssey' },
              { label: 'A Clockwork Orange' },
              { label: 'The Shining' }
            ]
          }
        ]
      },
      {
        label: 'Comedy',
        subSubItems: [
          {
            label: 'Wes Anderson',
            subSubSubItems: [
              { label: 'The Grand Budapest Hotel' },
              { label: 'Moonrise Kingdom' },
              { label: 'Fantastic Mr. Fox' }
            ]
          },
          {
            label: 'Edgar Wright',
            subSubSubItems: [
              { label: 'Shaun of the Dead' },
              { label: 'Hot Fuzz' },
              { label: 'Baby Driver' }
            ]
          },
          {
            label: 'Taika Waititi',
            subSubSubItems: [
              { label: 'What We Do in the Shadows' },
              { label: 'Jojo Rabbit' },
              { label: 'Hunt for the Wilderpeople' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 6,
    label: 'Travel',
    subItems: [
      {
        label: 'Europe',
        subSubItems: [
          {
            label: 'France',
            subSubSubItems: [
              { label: 'Eiffel Tower' },
              { label: 'Louvre Museum' },
              { label: 'Notre Dame' }
            ]
          },
          {
            label: 'Italy',
            subSubSubItems: [
              { label: 'Colosseum' },
              { label: 'Venice Canals' },
              { label: 'Leaning Tower' }
            ]
          },
          {
            label: 'Spain',
            subSubSubItems: [
              { label: 'Sagrada Familia' },
              { label: 'Alhambra' },
              { label: 'Park Güell' }
            ]
          }
        ]
      },
      {
        label: 'Asia',
        subSubItems: [
          {
            label: 'Japan',
            subSubSubItems: [
              { label: 'Mount Fuji' },
              { label: 'Tokyo Tower' },
              { label: 'Fushimi Inari' }
            ]
          },
          {
            label: 'Thailand',
            subSubSubItems: [
              { label: 'Grand Palace' },
              { label: 'Wat Arun' },
              { label: 'Ayutthaya' }
            ]
          },
          {
            label: 'India',
            subSubSubItems: [
              { label: 'Taj Mahal' },
              { label: 'Red Fort' },
              { label: 'Golden Temple' }
            ]
          }
        ]
      },
      {
        label: 'Americas',
        subSubItems: [
          {
            label: 'USA',
            subSubSubItems: [
              { label: 'Statue of Liberty' },
              { label: 'Grand Canyon' },
              { label: 'Yellowstone' }
            ]
          },
          {
            label: 'Brazil',
            subSubSubItems: [
              { label: 'Christ the Redeemer' },
              { label: 'Iguazu Falls' },
              { label: 'Amazon Rainforest' }
            ]
          },
          {
            label: 'Peru',
            subSubSubItems: [
              { label: 'Machu Picchu' },
              { label: 'Nazca Lines' },
              { label: 'Sacred Valley' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 7,
    label: 'Technology',
    subItems: [
      {
        label: 'Devices',
        subSubItems: [
          {
            label: 'Smartphones',
            subSubSubItems: [
              { label: 'iPhone' },
              { label: 'Samsung Galaxy' },
              { label: 'Google Pixel' }
            ]
          },
          {
            label: 'Computers',
            subSubSubItems: [
              { label: 'MacBook' },
              { label: 'ThinkPad' },
              { label: 'Surface' }
            ]
          },
          {
            label: 'Wearables',
            subSubSubItems: [
              { label: 'Apple Watch' },
              { label: 'Fitbit' },
              { label: 'Oculus Quest' }
            ]
          }
        ]
      },
      {
        label: 'Software',
        subSubItems: [
          {
            label: 'Operating Systems',
            subSubSubItems: [
              { label: 'Windows' },
              { label: 'macOS' },
              { label: 'Linux' }
            ]
          },
          {
            label: 'Applications',
            subSubSubItems: [
              { label: 'Microsoft Office' },
              { label: 'Adobe Creative' },
              { label: 'Google Workspace' }
            ]
          },
          {
            label: 'Development',
            subSubSubItems: [
              { label: 'Visual Studio' },
              { label: 'IntelliJ IDEA' },
              { label: 'VS Code' }
            ]
          }
        ]
      },
      {
        label: 'Innovation',
        subSubItems: [
          {
            label: 'Artificial Intelligence',
            subSubSubItems: [
              { label: 'Machine Learning' },
              { label: 'Neural Networks' },
              { label: 'Deep Learning' }
            ]
          },
          {
            label: 'Cloud Computing',
            subSubSubItems: [
              { label: 'AWS' },
              { label: 'Azure' },
              { label: 'Google Cloud' }
            ]
          },
          {
            label: 'Blockchain',
            subSubSubItems: [
              { label: 'Bitcoin' },
              { label: 'Ethereum' },
              { label: 'Smart Contracts' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 8,
    label: 'Science',
    subItems: [
      {
        label: 'Physics',
        subSubItems: [
          {
            label: 'Quantum',
            subSubSubItems: [
              { label: 'Quantum Entanglement' },
              { label: 'Superposition' },
              { label: 'Quantum Computing' }
            ]
          },
          {
            label: 'Relativity',
            subSubSubItems: [
              { label: 'Special Relativity' },
              { label: 'General Relativity' },
              { label: 'Space-Time' }
            ]
          },
          {
            label: 'Particle',
            subSubSubItems: [
              { label: 'Higgs Boson' },
              { label: 'Quarks' },
              { label: 'Neutrinos' }
            ]
          }
        ]
      },
      {
        label: 'Biology',
        subSubItems: [
          {
            label: 'Genetics',
            subSubSubItems: [
              { label: 'DNA' },
              { label: 'RNA' },
              { label: 'Proteins' }
            ]
          },
          {
            label: 'Ecology',
            subSubSubItems: [
              { label: 'Ecosystems' },
              { label: 'Biodiversity' },
              { label: 'Conservation' }
            ]
          },
          {
            label: 'Evolution',
            subSubSubItems: [
              { label: 'Natural Selection' },
              { label: 'Speciation' },
              { label: 'Adaptation' }
            ]
          }
        ]
      },
      {
        label: 'Chemistry',
        subSubItems: [
          {
            label: 'Organic',
            subSubSubItems: [
              { label: 'Alkanes' },
              { label: 'Alkenes' },
              { label: 'Alcohols' }
            ]
          },
          {
            label: 'Inorganic',
            subSubSubItems: [
              { label: 'Metals' },
              { label: 'Non-metals' },
              { label: 'Transition Elements' }
            ]
          },
          {
            label: 'Biochemistry',
            subSubSubItems: [
              { label: 'Enzymes' },
              { label: 'Metabolism' },
              { label: 'Cell Signaling' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 9,
    label: 'Literature',
    subItems: [
      {
        label: 'Fiction',
        subSubItems: [
          {
            label: 'Novels',
            subSubSubItems: [
              { label: 'To Kill a Mockingbird' },
              { label: '1984' },
              { label: 'The Great Gatsby' }
            ]
          },
          {
            label: 'Short Stories',
            subSubSubItems: [
              { label: 'The Lottery' },
              { label: 'The Tell-Tale Heart' },
              { label: 'The Gift of the Magi' }
            ]
          },
          {
            label: 'Poetry',
            subSubSubItems: [
              { label: 'The Raven' },
              { label: 'The Road Not Taken' },
              { label: 'Ode to a Nightingale' }
            ]
          }
        ]
      },
      {
        label: 'Non-Fiction',
        subSubItems: [
          {
            label: 'Biography',
            subSubSubItems: [
              { label: 'Steve Jobs' },
              { label: 'Einstein' },
              { label: 'Marie Curie' }
            ]
          },
          {
            label: 'History',
            subSubSubItems: [
              { label: 'World War II' },
              { label: 'Ancient Rome' },
              { label: 'Renaissance' }
            ]
          },
          {
            label: 'Science',
            subSubSubItems: [
              { label: 'A Brief History of Time' },
              { label: 'The Selfish Gene' },
              { label: 'Cosmos' }
            ]
          }
        ]
      },
      {
        label: 'Drama',
        subSubItems: [
          {
            label: 'Tragedy',
            subSubSubItems: [
              { label: 'Hamlet' },
              { label: 'Othello' },
              { label: 'Macbeth' }
            ]
          },
          {
            label: 'Comedy',
            subSubSubItems: [
              { label: 'A Midsummer Night\'s Dream' },
              { label: 'Much Ado About Nothing' },
              { label: 'The Importance of Being Earnest' }
            ]
          },
          {
            label: 'Modern',
            subSubSubItems: [
              { label: 'Death of a Salesman' },
              { label: 'A Streetcar Named Desire' },
              { label: 'Waiting for Godot' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 10,
    label: 'Art',
    subItems: [
      {
        label: 'Painting',
        subSubItems: [
          {
            label: 'Renaissance',
            subSubSubItems: [
              { label: 'Mona Lisa' },
              { label: 'The Last Supper' },
              { label: 'The Creation of Adam' }
            ]
          },
          {
            label: 'Impressionism',
            subSubSubItems: [
              { label: 'Starry Night' },
              { label: 'Water Lilies' },
              { label: 'The Scream' }
            ]
          },
          {
            label: 'Modern',
            subSubSubItems: [
              { label: 'Guernica' },
              { label: 'The Persistence of Memory' },
              { label: 'Campbell\'s Soup Cans' }
            ]
          }
        ]
      },
      {
        label: 'Sculpture',
        subSubItems: [
          {
            label: 'Classical',
            subSubSubItems: [
              { label: 'David' },
              { label: 'Venus de Milo' },
              { label: 'The Thinker' }
            ]
          },
          {
            label: 'Modern',
            subSubSubItems: [
              { label: 'The Kiss' },
              { label: 'Bird in Space' },
              { label: 'Balloon Dog' }
            ]
          },
          {
            label: 'Contemporary',
            subSubSubItems: [
              { label: 'Cloud Gate' },
              { label: 'The Bean' },
              { label: 'LOVE' }
            ]
          }
        ]
      },
      {
        label: 'Architecture',
        subSubItems: [
          {
            label: 'Ancient',
            subSubSubItems: [
              { label: 'Pyramids' },
              { label: 'Parthenon' },
              { label: 'Colosseum' }
            ]
          },
          {
            label: 'Modern',
            subSubSubItems: [
              { label: 'Fallingwater' },
              { label: 'Sydney Opera House' },
              { label: 'Guggenheim Museum' }
            ]
          },
          {
            label: 'Contemporary',
            subSubSubItems: [
              { label: 'Burj Khalifa' },
              { label: 'The Shard' },
              { label: 'Marina Bay Sands' }
            ]
          }
        ]
      }
    ]
  }
];

// Create stores for each demo's menu items
export const menuDemoItems = writable<MenuItem[]>([]);
export const keyboardMenuDemoItems = writable<MenuItem[]>([]);

// Function to shuffle array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Function to initialize random categories for both demos
export function initializeRandomCategories() {
  const shuffledItems = shuffleArray(allMenuItems);
  menuDemoItems.set(shuffledItems.slice(0, 5));
  keyboardMenuDemoItems.set(shuffledItems.slice(5, 10));
} 