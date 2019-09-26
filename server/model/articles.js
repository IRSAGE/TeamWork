import faker from 'faker';

const articles = [
  {
    article: faker.lorem.paragraphs(),
  },
  {
    title: ' ',
    article: faker.lorem.paragraphs(),
  },
  {
    title: '89977789',
    article: faker.lorem.paragraphs(),
  },
  {
    title: 'new in technology',
    article: 'Technology is running faster',
  },
];

export default articles;
