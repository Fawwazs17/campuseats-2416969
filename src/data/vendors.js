const vendors = [
  {
    id: 'kedai-ayam-gunting',
    name: 'Kedai Ayam Gunting',
    location: 'Mahallah Zubair',
    openHours: '11:00 am - 11:00 pm',
    isOpen: true,
    menu: [
      { id: 'kag-1', name: 'Ayam Gunting Original', description: 'Crispy fried chicken cut into bite-size pieces, with chilli sauce', price: 8, category: 'Chicken', available: true },
      { id: 'kag-2', name: 'Nasi Ayam Gunting', description: 'White rice with ayam gunting, cucumber and sambal', price: 9.5, category: 'Rice', available: true },
      { id: 'kag-3', name: 'Ayam Cheese', description: 'Ayam gunting topped with melted cheese sauce', price: 10, category: 'Chicken', available: true },
      { id: 'kag-4', name: 'Sosej Gunting', description: 'Fried sausage cut into bite-size pieces, with chilli sauce', price: 5, category: 'Sides', available: false },
    ],
  },
  {
    id: 'kafe-aminah',
    name: 'Kafe Mahallah Aminah',
    location: 'Mahallah Aminah, Ground Floor',
    openHours: '8:00 am - 9:00 pm',
    isOpen: true,
    menu: [
      { id: 'ami-1', name: 'Nasi Ayam Penyet', description: 'Smashed fried chicken with sambal and rice', price: 9, category: 'Rice', available: true },
      { id: 'ami-2', name: 'Air Bandung', description: 'Rose syrup with milk', price: 3, category: 'Drinks', available: true },
    ],
  },
]

export default vendors
