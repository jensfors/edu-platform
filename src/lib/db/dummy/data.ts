import type { Persona, User } from '@prisma/client'

export const userMatti: User = {
  id: 'someid1',
  email: 'mkra17@student.aau.dk',
  firstName: 'Mathias',
  lastName: 'Rasmussen',
  role: 'Creator',
  avatarURL: 'https://avatars.githubusercontent.com/u/34272381?v=4',
  createdAt: new Date('Wed, 27 July 2016 13:30:00'),
}

export const userJen: User = {
  id: 'someid2',
  email: 'jnan17@student.aau.dk',
  firstName: 'Jen',
  lastName: 'Andersen',
  role: 'Creator',
  avatarURL: 'https://avatars.githubusercontent.com/u/34272473?v=4',
  createdAt: new Date('Wed, 27 July 2016 13:30:00'),
}

export const userKasper: User = {
  id: 'someid3',
  email: 'kjepse17@student.aau.dk',
  firstName: 'Per',
  lastName: 'Jepsen',
  role: 'Normal',
  avatarURL:
    'https://cdn.discordapp.com/attachments/363271799594811394/950673688137695322/Kaswer.PNG',
  createdAt: new Date('Wed, 27 July 2016 13:30:00'),
}

export const userSimon: User = {
  id: 'someid4',
  email: 'sabj17@student.aau.dk',
  firstName: 'Simon',
  lastName: 'Anielski',
  role: 'Normal',
  avatarURL:
    'https://cdn.discordapp.com/attachments/363271799594811394/950673188247994398/simonbaby.jpg',
  createdAt: new Date('Wed, 27 July 2016 13:30:00'),
}

export const bobBlind: Persona = {
  id: 'personaid1',
  name: 'Bob Blind',
  age: 25,
  disability: null,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  avatarUrl:
    'https://thumbs.dreamstime.com/b/blind-man-guide-dog-icon-cartoon-style-illustration-vector-web-design-85980894.jpg',
  private: false,
  official: false,
  authorId: 'someid1',
}

export const danDeaf: Persona = {
  id: 'personaid2',
  name: 'Dan Deaf',
  age: 32,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  avatarUrl:
    'https://thumbs.dreamstime.com/b/deaf-male-character-ear-closeup-stop-sign-deaf-male-character-ear-closeup-sound-wave-stop-sign-isolated-cartoon-104476968.jpg',
  disability: null,
  private: true,
  official: false,
  authorId: 'someid1',
}

export const mattiMovement: Persona = {
  id: 'personaid3',
  name: 'Matti Movement',
  age: 22,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  avatarUrl:
    'https://previews.123rf.com/images/jemastock/jemastock1805/jemastock180505112/101629762-man-in-wheelchair-cartoon-vector-illustration-graphic-design.jpg',
  disability: null,
  private: true,
  official: false,
  authorId: 'someid2',
}
