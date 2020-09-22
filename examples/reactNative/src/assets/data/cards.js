export const cardsReact = [
  {
    question: 'We can go for keys when there is possibility that our user could change the data.',
    cards: [
      { number: 'A', question: 'Keys', value: true, revealed: false, picked: false },
      { number: 'B', question: 'Ref', value: false, revealed: false, picked: false },
      { number: 'C', question: 'Both', value: false, revealed: false, picked: false },
      { number: 'D', question: 'None of above', value: false, revealed: false, picked: false }
    ]
  },
  {
    question: 'JSX is typesafe.',
    cards: [
      { number: 'A', question: 'True', value: true, revealed: false, picked: false },
      { number: 'B', question: 'False', value: false, revealed: false, picked: false }
    ]
  },
  {
    question: 'Which of the following needs to be updated to achieve dynamic UI updates?',
    cards: [
      { number: 'A', question: 'State', value: true, revealed: false, picked: false },
      { number: 'B', question: 'Props', value: false, revealed: false, picked: false }
    ]
  }
]

const cardsAgile = [
  {
    question: 'When might a Sprint be abnormally cancelled?',
    cardsAmount: 31,
    author: 'Ewa',
    type: 'Agile Basics',
    cards: [
      {
        number: 'A',
        question: 'When the Sprint Goal becomes obsolete',
        value: true,
        revealed: false,
        picked: false
      },
      {
        number: 'B',
        question: 'When the sales department has an important new opportunity',
        value: false,
        revealed: false,
        picked: false
      },
      {
        number: 'C',
        question:
          'When it becomes clear that not everything will be finished by the end of the Sprint',
        value: false,
        revealed: false,
        picked: false
      }
    ]
  },
  {
    question: 'Who is required to attend the Daily Scrum?',
    cards: [
      {
        number: 'A',
        question: 'The Development Team and Scrum Master',
        value: true,
        revealed: false,
        picked: false
      },
      {
        number: 'B',
        question: 'The Scrum Master and Product Owner',
        value: false,
        revealed: false,
        picked: false
      },
      {
        number: 'C',
        question: 'The Development Team',
        value: false,
        revealed: false,
        picked: false
      }
    ]
  },
  {
    question: 'The Development Team should have all the skills needed to:',
    cards: [
      {
        number: 'A',
        question:
          'Complete the project as estimated when the date and cost are committed to the Product Owner',
        value: true,
        revealed: false,
        picked: false
      },
      {
        number: 'B',
        question:
          'Do all of the development work, except for specialized testing that requires additional tools and environments',
        value: false,
        revealed: false,
        picked: false
      },
      {
        number: 'C',
        question:
          'Turn the Product Backlog items it selects into an increment of potentially releasable product functionality',
        value: false,
        revealed: false,
        picked: false
      }
    ]
  }
]

const cardsDesign = [
  {
    question: 'Can design system contain information about copywriting?',
    cards: [
      { number: 'A', question: 'Yes', value: true, revealed: false, picked: false },
      { number: 'B', question: 'No', value: false, revealed: false, picked: false }
    ]
  },
  {
    question: 'Who is taking care of managing a design system?',
    cards: [
      { number: 'A', question: 'Product Designer', value: true, revealed: false, picked: false },
      { number: 'B', question: 'UI Designer', value: false, revealed: false, picked: false },
      { number: 'C', question: 'None of above', value: false, revealed: false, picked: false }
    ]
  },
  {
    question: 'Are there official standards for Design Systems?',
    cards: [
      { number: 'A', question: 'Yes', value: true, revealed: false, picked: false },
      { number: 'B', question: 'No', value: false, revealed: false, picked: false }
    ]
  },
  {
    question: 'What kind of animal is the dolphin?',
    cards: [
      { number: 'A', question: 'Mammalr', value: true, revealed: false, picked: false },
      { number: 'B', question: 'Reptile', value: false, revealed: false, picked: false },
      { number: 'C', question: 'Fish', value: false, revealed: false, picked: false },
      { number: 'C', question: 'Amphibian', value: false, revealed: false, picked: false }
    ]
  }
]

const Brandon = {
  id: '1128349857',
  cardsAmount: 10,
  author: 'Brandon',
  type: 'Product Design',
  label: 'Design System',
  cards: cardsDesign,
  color: 'rgb(78,15,255)',
  labelColor: 'rgb(89,80,249)',
  image: require('../../assets/images/photosPortraitBrandon.png'),
  about: 'Coffee buff. Web enthusiast. Unapologetic student. Gamer. Avid organizer.'
}

const Ewa = {
  id: '3832934409',
  cardsAmount: 31,
  author: 'Ewa',
  type: 'Project Management',
  label: 'Agile Basics',
  cards: cardsAgile,
  color: 'rgb(138,85,192)',
  labelColor: 'rgb(163,109,217)',
  image: require('../../assets/images/photosPortraitEwa.png'),
  about: 'Wannabe entrepreneur. Reader. Devoted organizer. Social media lover. Analyst.'
}

const Jennifer = {
  id: '2849503859',
  cardsAmount: 16,
  author: 'Jennifer',
  type: 'Development',
  label: 'React Native 101',
  cards: cardsReact,
  color: 'rgb(255,94,107)',
  labelColor: 'rgb(255,130,140)',
  image: require('../../assets/images/photosPortraitJennifer.png'),
  about: 'Web nerd. Alcohol trailblazer. Organizer. Hipster-friendly explorer.'
}

export { Brandon, Ewa, Jennifer }
