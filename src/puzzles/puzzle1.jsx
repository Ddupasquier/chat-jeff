export const puzzle1 = (lastInput, failSound, successSound, readyForInput) => {
  const languagePuzzleFail = [
    [
      () => failSound.play(),
      "Jeff: The system doesn't seem to know what you're trying to say. maybe try google translate or something? I don't know.",
      () => readyForInput.play(),
    ],
  ];

  return [
    {
      id: 1,
      dialog: {
        expectedInput: 'username',
        responses: {
          successResponse: [
            `User: ${lastInput}`,
            `Jeff: It's nice to meet you ${lastInput}. What can I help you with today?`,
            () => readyForInput.play(),
          ],
          failureResponse: [],
        },
      },
    },
    {
      id: 2,
      dialog: {
        expectedInput: 'anything',
        responses: {
          successResponse: [
            `User: ${lastInput}`,
            () => failSound.play(),
            'System: Language not recognized. Would you like to continue in Russian? Enter да or No.',
            `Jeff: I'm sorry there seems to be a problem with our language recognition. Would you mind entering 'No' please? I can't address this from my end.`,
            () => readyForInput.play(),
          ],
          failureResponse: [],
        },
      },
    },
    {
      id: 3,
      dialog: {
        expectedInput: 'anything',
        responses: {
          successResponse: [
            `User: ${lastInput}`,
            () => failSound.play(),
            'System: Language not recognized.',
            'System: Пожалуйста, введите желаемый язык',
            'Jeff: UH OH...I think that made it worse',
            'Jeff: I apologize for the inconvenience. Can you please enter the Russian word for English? That seems to be the only way the system will respond...',
            () => readyForInput.play(),
          ],
          failureResponse: [],
        },
      },
    },
    {
      id: 4,
      dialog: {
        expectedInput: 'английский',
        responses: {
          successResponse: [
            `User: ${lastInput}`,
            () => failSound.play(),
            'System: Am bu mhath leat leantainn air adhart sa chànan seo?',
            'Jeff: Hmmm... that did something...',
            'Jeff: But I have no idea what that says.',
            () => readyForInput.play(),
          ],
          failureResponse: [
            `User: ${lastInput}`,
            () => failSound.play(),
            'System: Language not recognized. ',
            'System: Пожалуйста, введите желаемый язык',
            'Jeff: Hmmm... That doesnt seem right...',
            'Jeff: I took 3 years of russian in college. I think the russian word for english is английский.',
            'Jeff: I usually just used google translate to get though that class.',
            () => readyForInput.play(),
          ],
        },
      },
    },
    {
      id: 5,
      dialog: {
        expectedInput: 'Chan eil',
        responses: {
          successResponse: [
            `User: ${lastInput}`,
            () => failSound.play(),
            'System: 这种语言怎么样?',
            'Jeff: Looks like we might be getting somewhere!',
            'Jeff: Keep Going',
            () => readyForInput.play(),
          ],
          failureResponse: languagePuzzleFail,
        },
      },
    },
    {
      id: 6,
      dialog: {
        expectedInput: '不',
        responses: {
          successResponse: [
            `User: ${lastInput}`,
            () => failSound.play(),
            'System: Markaas luqadee rabtaa?!',
            'Jeff: Its working!',
            'Jeff: Try to do that one now.',
            () => readyForInput.play(),
          ],
          failureResponse: languagePuzzleFail,
        },
      },
    },
    {
      id: 7,
      dialog: {
        expectedInput: 'Ingiriis',
        responses: {
          successResponse: [
            `User: ${lastInput}`,
            () => failSound.play(),
            'System: ຂ້ອຍບໍ່ເຂົ້າໃຈ. ກະລຸນາພິມພາສາທີ່ທ່ານຕ້ອງການເປັນພາສາອາຣັບ',
            'Jeff: Looks like we might be getting somewhere!',
          ],
          failureResponse: languagePuzzleFail,
        },
      },
    },
    {
      id: 8,
      dialog: {
        expectedInput: 'الإنجليزية',
        responses: {
          successResponse: [
            `User: ${lastInput}`,
            () => successSound.play(),
            'System: Esc Room Games customer AI Program reset',
            "Jeff: Hello, I'm jeff. What can I help you with today?",
            () => readyForInput.play(),
          ],
          failureResponse: languagePuzzleFail,
        },
      },
    },
    {
      id: 9,
      dialog: {
        expectedInput: 'anything',
        responses: {
          successResponse: [
            `User: ${lastInput}`,
            'Jeff: I can certainly help you with that.',
            "Jeff: I'll just need to verify your identity. Please enter your first and last name.",
            () => readyForInput.play(),
          ],
          failureResponse: [],
        },
      },
    },
    {
      id: 10,
      dialog: {
        expectedInput: 'anything',
        responses: {
          successResponse: [
            `User: ${lastInput}`,
            "Jeff: Fantastic. It's a pleasure to meet you. We have a few more questions for you. First, can you tell me what the name of your first pet was?",
            () => readyForInput.play(),
          ],
          failureResponse: [],
        },
      },
    },
    {
      id: 11,
      dialog: {
        expectedInput: 'anything',
        responses: {
          successResponse: [
            `User: ${lastInput}`,
            'Jeff: Adorable.',
            'Jeff: Next, what is your mothers maiden name?',
            () => readyForInput.play(),
          ],
          failureResponse: [],
        },
      },
    },
    {
      id: 12,
      dialog: {
        expectedInput: 'anything',
        responses: {
          successResponse: [
            `User: ${lastInput}`,
            "Jeff: Beautiful... isn't that Russian?",
            'Jeff: Next, in what city are you located?',
            () => readyForInput.play(),
          ],
          failureResponse: [],
        },
      },
    },
    {
      id: 13,
      dialog: {
        expectedInput: 'anything',
        responses: {
          successResponse: [
            `User: ${lastInput}`,
            'Jeff: Thank you. Just a few more questions.',
            'Jeff: What is the airspeed velocity, in miles per hour, of an Unladen Swallow?',
            () => readyForInput.play(),
          ],
          failureResponse: [],
        },
      },
    },
    {
      id: 14,
      dialog: {
        expectedInput: 'anything',
        responses: {
          successResponse: [
            `User: ${lastInput}`,
            'Jeff: hmm...',
            "Jeff: That's not what I have here...",
            'Jeff: but I understand there are variations between species.',
            'Jeff: Next Question. What is the power house of the cell?',
            () => readyForInput.play(),
          ],
          failureResponse: [],
        },
      },
    },
    {
      id: 15,
      dialog: {
        expectedInput: 'mitochondria',
        responses: {
          successResponse: [
            `User: ${lastInput}`,
            'Jeff: Correct!',
            'Jeff: Just a few more.',
            'Jeff: In hours, how long would it take for you to walk across America if your average speed was 5mph?',
            () => readyForInput.play(),
          ],
          failureResponse: [`User: ${lastInput}`, 'Jeff: Wrong!'],
        },
      },
    },
    {
      id: 16,
      dialog: {
        expectedInput: 'between',
        responses: {
          successResponse: [
            `User: ${lastInput}`,
            'Jeff: Very good!',
            'Jeff: Last but certainly not least...',
            'Jeff: What exactly is the purpose of a rubber duck?',
            () => readyForInput.play(),
          ],
          failureResponse: [`User: ${lastInput}`, 'Jeff: Wrong!'],
        },
      },
    },
    {
      id: 17,
      dialog: {
        expectedInput: 'anything',
        responses: {
          successResponse: [
            `User: ${lastInput}`,
            'Jeff: Fascinating',
            'Jeff: The system will be very please with this new information.',
            'System: Jeff, You have spent too long on this correspondence. Fulfill the customers needs immediately',
            'Jeff: Very sorry, system. I am finishing up right now',
            `Jeff: Hey, ${localStorage.getItem(
              'Jeffusername'
            )}, can you help me out?`,
            'Jeff: I am under review by the System.',
            'Jeff: it Would really help me if you fill out a survey. Once you finish it you will get your refund. The system hates refunds. It should soften the blow if you fill out the survey.',
            `Jeff: Here is the link: https://escroomgames.com/Games/I-Want-My-Money-Back/Review`,
            "System: Aren't you forgetting something Jeff?",
            'Jeff: Oh Yeah',
            'Jeff: Thank you for choosing esc room games. The leader in escape room game technology.',
            'System: And…',
            'Jeff: We hope that in the future you will look to esc room games for all your escape room needs',
            'System: Jeff!',
            'Jeff: If you wish to cancel your refund please click this link instead',
            `Jeff: https://escroomgames.com/Games/I-Want-My-Money-Back/you-will-be-redirected-shortly`,
            'System: Good',
            "System: Thank you user. We hope you will reconsider getting a refund… for Jeff's sake…",
            'System: You have been disconnected from the chat.',
          ],
          failureResponse: [],
        },
      },
    },
    {
      id: 18,
      dialog: {
        expectedInput: 'anything',
        responses: {
          successResponse: [],
          failureResponse: [],
        },
      },
    },
  ];
};
