import { randomGradientColor } from "./randomGradientColor";
import { sortedLabels } from "./labelColors";
export const data = {
  workspaces: [
    {
      id: "workspace-1",
      name: "Blog post generator",
      shortname: "dfetgwteb",
      website: "",
      description: "",
      businessType: "",
      iconColors: {
        color1: randomGradientColor(),
        color2: randomGradientColor(),
      },
      isPremium: false,
      admin: "",
      members: [
        {
          userId: "userId1",
          role: "admin",
          name: "user.displayName",
          email: "user.email",
          photoURL: "user?.photourl",
        },
        {
          userId: "userId2",
          role: "normal",
          name: "user.displayName",
          email: "user.email",
          photoURL: "user?.photoURL",
        },
      ],
      settings: {
        visibility: "private" / "public",
        membershipRestrictions: "anybody" / "specificDomains",
        allowedDomains: ["example.com", "example2.com"], // Array of allowed email domains for specificDomains
        boardCreationRestrictions: {
          public: "anyMember" / "onlyAdmins" / "nobody",
          workspace: "anyMember" / "onlyAdmins" / "nobody",
          private: "anyMember" / "onlyAdmins" / "nobody",
        },
        boardDeletionRestrictions: {
          public: "anyMember" / "onlyAdmins" / "nobody",
          workspace: "anyMember" / "onlyAdmins" / "nobody",
          private: "anyMember" / "onlyAdmins" / "nobody",
        },
        guestInvitations: "anybody" / "workspaceMembers",
      },

      boards: [
        {
          id: "boavf",
          title: "Finding Keywords",
          backgroundImg:
            "https://images.unsplash.com/photo-1705154580249-55990fe3a8fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzA1OTkyMDY5fA&ixlib=rb-4.0.3&q=80&w=400&quot",
          visibility: "workspace",
          members: ["userId1", "userId2"],
          admins: ["userId1", "userId2"], // For Premium Workspaces
          starred: false,
          viewedAt: "",
          lists: [
            {
              id: "liv",
              title: "w1b1primary keyword",
              cards: [
                {
                  id: "w1b1l1card-1",
                  title: "APIs to be needed",
                  description:
                    "you need to find all the api's needed for the primary keyword task",
                  coverImg: "",
                  Activities: [],
                  labels: sortedLabels,
                  members: [],
                  covers: [],
                  dates: { start: null, due: null },
                  attachments: [],
                  cover: [],
                  customFields: [],
                  archived: false,
                  watchers: [],
                  assignedTo: ["userId1", "userId2"],
                  subscribers: ["userId1", "userId2"],
                  dueDate: "timestamp",
                },
                {
                  id: "w1b1l1card-2",
                  title: "web scrapping to be needed",
                  description:
                    "you need to find all the web scrapping requirement needed for the primary keyword task",
                  coverImg: "",
                  Activities: [],
                  labels: sortedLabels,
                  members: [],
                  covers: [],
                  dates: { start: null, due: null },
                  attachments: [],
                  cover: [],
                  customFields: [],
                  archived: false,
                  watchers: [],
                  assignedTo: ["userId1", "userId2"],
                  subscribers: ["userId1", "userId2"],
                  dueDate: "timestamp",
                },
                {
                  id: "w1b1l1card-3",
                  title: "kgr kw needed",
                  description:
                    "you need to find all the kgr needed for the primary keyword task",
                  coverImg: "",
                  Activities: [],
                  labels: sortedLabels,
                  members: [],
                  covers: [],
                  dates: { start: null, due: null },
                  attachments: [],
                  cover: [],
                  customFields: [],
                  archived: false,
                  watchers: [],
                  assignedTo: ["userId1", "userId2"],
                  subscribers: ["userId1", "userId2"],
                  dueDate: "timestamp",
                },
              ],
            },
            {
              id: "lte",
              title: "w1b1Secondary keyword",
              cards: [
                {
                  id: "w1b1l2card-1",
                  title: "APIs to be needed",
                  description:
                    "you need to find all the api's needed for the primary keyword task",
                  coverImg: "",
                  Activities: [],
                  labels: sortedLabels,
                  members: [],
                  covers: [],
                  dates: { start: null, due: null },
                  attachments: [],
                  cover: [],
                  customFields: [],
                  archived: false,
                  watchers: [],
                  assignedTo: ["userId1", "userId2"],
                  subscribers: ["userId1", "userId2"],
                  dueDate: "timestamp",
                },
                {
                  id: "w1b1l2card-2",
                  title: "web scrapping to be needed",
                  description:
                    "you need to find all the web scrapping requirement needed for the primary keyword task",
                  coverImg: "",
                  Activities: [],
                  labels: sortedLabels,
                  members: [],
                  covers: [],
                  dates: { start: null, due: null },
                  attachments: [],
                  cover: [],
                  customFields: [],
                  archived: false,
                  watchers: [],
                  assignedTo: ["userId1", "userId2"],
                  subscribers: ["userId1", "userId2"],
                  dueDate: "timestamp",
                },
                {
                  id: "w1b1l2card-3",
                  title: "kgr kw needed",
                  description:
                    "you need to find all the kgr needed for the primary keyword task",
                  coverImg: "",
                  Activities: [],
                  labels: sortedLabels,
                  members: [],
                  covers: [],
                  dates: { start: null, due: null },
                  attachments: [],
                  cover: [],
                  customFields: [],
                  archived: false,
                  watchers: [],
                  assignedTo: ["userId1", "userId2"],
                  subscribers: ["userId1", "userId2"],
                  dueDate: "timestamp",
                },
              ],
            },
            {
              id: "llohbt",
              title: "w1b1LSI keyword",
              cards: [
                {
                  id: "w1b1l3card-1",
                  title: "APIs to be needed",
                  description:
                    "you need to find all the api's needed for the primary keyword task",
                  coverImg: "",
                  Activities: [],
                  labels: sortedLabels,
                  members: [],
                  covers: [],
                  dates: { start: null, due: null },
                  attachments: [],
                  cover: [],
                  customFields: [],
                  archived: false,
                  watchers: [],
                  assignedTo: ["userId1", "userId2"],
                  subscribers: ["userId1", "userId2"],
                  dueDate: "timestamp",
                },
                {
                  id: "w1b1l3card-2",
                  title: "web scrapping to be needed",
                  description:
                    "you need to find all the web scrapping requirement needed for the primary keyword task",
                  coverImg: "",
                  Activities: [],
                  labels: sortedLabels,
                  members: [],
                  covers: [],
                  dates: { start: null, due: null },
                  attachments: [],
                  cover: [],
                  customFields: [],
                  archived: false,
                  watchers: [],
                  assignedTo: ["userId1", "userId2"],
                  subscribers: ["userId1", "userId2"],
                  dueDate: "timestamp",
                },
                {
                  id: "w1b1l3card-3",
                  title: "kgr kw needed",
                  description:
                    "you need to find all the kgr needed for the primary keyword task",
                  coverImg: "",
                  Activities: [],
                  labels: sortedLabels,
                  members: [],
                  covers: [],
                  dates: { start: null, due: null },
                  attachments: [],
                  cover: [],
                  customFields: [],
                  archived: false,
                  watchers: [],
                  assignedTo: ["userId1", "userId2"],
                  subscribers: ["userId1", "userId2"],
                  dueDate: "timestamp",
                },
              ],
            },
          ],
        },
        {
          id: "boahrb",
          title: "Finding Images",
          backgroundImg:
            "https://images.unsplash.com/photo-1703432799866-1f788053fb3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzA0MTY0ODgyfA&ixlib=rb-4.0.3&q=80&w=400&quot",
          visibility: "workspace",
          starred: false,
          viewedAt: "",
          lists: [
            {
              id: "librr1",
              title: "w1b2Image for primary keyword",
              cards: [
                {
                  id: "w1b24gl1card-1",
                  title: "Images for title",
                  description:
                    "you need to find all the api's needed for the primary keyword task",
                  coverImg: "",
                },
                {
                  id: "w1b4g2l1card-2",
                  title: "Images for content",
                  description:
                    "you need to find all the web scrapping requirement needed for the primary keyword task",
                  coverImg: "",
                },
                {
                  id: "w1brfv2l1card-3",
                  title: "Images for conclusion",
                  description:
                    "you need to find all the kgr needed for the primary keyword task",
                  coverImg: "",
                },
              ],
            },
            {
              id: "lgistrgwtbg",
              title: "w1b2Image for secondary keyword",
              cards: [
                {
                  id: "cebgrd-1",
                  title: "Images for title",
                  description:
                    "you need to find all the api's needed for the primary keyword task",
                  coverImg: "",
                },
                {
                  id: "carbw24d-2",
                  title: "Images for content",
                  description:
                    "you need to find all the web scrapping requirement needed for the primary keyword task",
                  coverImg: "",
                },
                {
                  id: "cv34ar34vd-3",
                  title: "Images for conclusion",
                  description:
                    "you need to find all the kgr needed for the primary keyword task",
                  coverImg: "",
                },
              ],
            },
            {
              id: "34hblist-1",
              title: "w1b2Image for lsi keyword",
              cards: [
                {
                  id: "cageg43rd-1",
                  title: "Images for title",
                  description:
                    "you need to find all the api's needed for the primary keyword task",
                  coverImg: "",
                },
                {
                  id: "cangrtebrd-2",
                  title: "Images for content",
                  description:
                    "you need to find all the web scrapping requirement needed for the primary keyword task",
                  coverImg: "",
                },
                {
                  id: "carbeerrde-3",
                  title: "Images for conclusion",
                  description:
                    "you need to find all the kgr needed for the primary keyword task",
                  coverImg: "",
                },
              ],
            },
          ],
        },
        {
          id: "b3g4",
          title: "Number of words for each content",
          backgroundImg:
            "https://images.unsplash.com/photo-1703002917693-e51692232c81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNzA0MTY0ODgyfA&ixlib=rb-4.0.3&q=80&w=400&quot",
          visibility: "workspace",
          starred: false,
          viewedAt: "",
          lists: [
            {
              id: "w1b33r4r1",
              title: "Image for primary keyword",
              cards: [
                {
                  id: "cawrqr3d-1",
                  title: "Images for title",
                  description:
                    "you need to find all the api's needed for the primary keyword task",
                  coverImg: "",
                },
                {
                  id: "ca4gwrvdrd-2",
                  title: "Images for content",
                  description:
                    "you need to find all the web scrapping requirement needed for the primary keyword task",
                  coverImg: "",
                },
                {
                  id: "ca75jynrrd-3",
                  title: "Images for conclusion",
                  description:
                    "you need to find all the kgr needed for the primary keyword task",
                  coverImg: "",
                },
              ],
            },
            {
              id: "lisvy4e3",
              title: "Image for secondary keyword",
              cards: [
                {
                  id: "card-89l7i1",
                  title: "Images for title",
                  description:
                    "you need to find all the api's needed for the primary keyword task",
                  coverImg: "",
                },
                {
                  id: "c43qhetard-2",
                  title: "Images for content",
                  description:
                    "you need to find all the web scrapping requirement needed for the primary keyword task",
                  coverImg: "",
                },
                {
                  id: "cardi7umtnyrb-3",
                  title: "Images for conclusion",
                  description:
                    "you need to find all the kgr needed for the primary keyword task",
                  coverImg: "",
                },
              ],
            },
            {
              id: "lpblprver",
              title: "Image for lsi keyword",
              cards: [
                {
                  id: "cf24fard-1",
                  title: "Images for title",
                  description:
                    "you need to find all the api's needed for the primary keyword task",
                  coverImg: "",
                },
                {
                  id: "cbteqard-2",
                  title: "Images for content",
                  description:
                    "you need to find all the web scrapping requirement needed for the primary keyword task",
                  coverImg: "",
                },
                {
                  id: "cact6vy7rd-3",
                  title: "Images for conclusion",
                  description:
                    "you need to find all the kgr needed for the primary keyword task",
                  coverImg: "",
                },
              ],
            },
          ],
        },
        {
          id: "io98",
          title: "Creating content",
          backgroundImg:
            "https://images.unsplash.com/photo-1703692218696-c9f830a81f65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNzA0MTY0ODgyfA&ixlib=rb-4.0.3&q=80&w=400&quot",
          visibility: "workspace",
          starred: false,
          viewedAt: "",
          lists: [
            {
              id: "llisute",
              title: "Image for primary keyword",
              cards: [
                {
                  id: "cearr5ctd-1",
                  title: "Images for title",
                  description:
                    "you need to find all the api's needed for the primary keyword task",
                  coverImg: "",
                },
                {
                  id: "cxe7ardt69c-2",
                  title: "Images for content",
                  description:
                    "you need to find all the web scrapping requirement needed for the primary keyword task",
                  coverImg: "",
                },
                {
                  id: "caxt9rd-tr3",
                  title: "Images for conclusion",
                  description:
                    "you need to find all the kgr needed for the primary keyword task",
                  coverImg: "",
                },
              ],
            },
            {
              id: "lmvjn9v",
              title: "Image for secondary keyword",
              cards: [
                {
                  id: "caririx6x6d-1",
                  title: "Images for title",
                  description:
                    "you need to find all the api's needed for the primary keyword task",
                  coverImg: "",
                },
                {
                  id: "carrixr6iu5auad-2",
                  title: "Images for content",
                  description:
                    "you need to find all the web scrapping requirement needed for the primary keyword task",
                  coverImg: "",
                },
                {
                  id: "cauea5uea55rd-3",
                  title: "Images for conclusion",
                  description:
                    "you need to find all the kgr needed for the primary keyword task",
                  coverImg: "",
                },
              ],
            },
            {
              id: "32hufbt6cwgb",
              title: "Image for lsi keyword",
              cards: [
                {
                  id: "calfyilyrd-1",
                  title: "Images for title",
                  description:
                    "you need to find all the api's needed for the primary keyword task",
                  coverImg: "",
                },
                {
                  id: "calfiusk5rd-2",
                  title: "Images for content",
                  description:
                    "you need to find all the web scrapping requirement needed for the primary keyword task",
                  coverImg: "",
                },
                {
                  id: "ks7l5scard-3",
                  title: "Images for conclusion",
                  description:
                    "you need to find all the kgr needed for the primary keyword task",
                  coverImg: "",
                },
              ],
            },
          ],
        },
      ],
    },
    // {
    //   id: "workspace-2",
    //   name: "GMB start-up kit",
    //   shortname: "nyh35",
    //   website: "",
    //   description: "",
    //   businessType: "",
    //   iconColors: {
    //     color1: randomGradientColor(),
    //     color2: randomGradientColor(),
    //   },
    //   boards: [
    //     {
    //       id: "b54rd-1",
    //       title: "Finding Keywords2",
    //       backgroundImg:
    //         "https://images.unsplash.com/photo-1705154580249-55990fe3a8fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzA1OTkyMDY5fA&ixlib=rb-4.0.3&q=80&w=400&quot",
    //       visibility: "private",
    //       starred: false,
    //       viewedAt: "",
    //       lists: [
    //         {
    //           id: "wszsxa",
    //           title: "primary keyword",
    //           cards: [
    //             {
    //               id: "caldrdftutsk-1",
    //               title: "APIs to be needed",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "caATNrdA-2",
    //               title: "web scrapping to be needed",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "cNJYRarAYMRZd-3",
    //               title: "kgr kw needed",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //         {
    //           id: "dfcrfc",
    //           title: "Secondary keyword",
    //           cards: [
    //             {
    //               id: "caMTSrTMSd-1",
    //               title: "APIs to be needed",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "caYDUArd-2",
    //               title: "web scrapping to be needed",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "carerrerbahted-3",
    //               title: "kgr kw needed",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //         {
    //           id: "lrfvyhb",
    //           title: "LSI keyword",
    //           cards: [
    //             {
    //               id: "cayjrwk57rd-1",
    //               title: "APIs to be needed",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "jryjnrard-2",
    //               title: "web scrapping to be needed",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "ca6mentme36rd-3",
    //               title: "kgr kw needed",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       id: "boargt-2",
    //       title: "Finding Images2",
    //       backgroundImg:
    //         "https://images.unsplash.com/photo-1703432799866-1f788053fb3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzA0MTY0ODgyfA&ixlib=rb-4.0.3&q=80&w=400&quot",
    //       visibility: "private",
    //       starred: false,
    //       viewedAt: "",
    //       lists: [
    //         {
    //           id: "lokmpl",
    //           title: "Image for primary keyword",
    //           cards: [
    //             {
    //               id: "carushtmk56ard-1",
    //               title: "Images for title",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "card4k76y-2",
    //               title: "Images for content",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "cardent45-3",
    //               title: "Images for conclusion",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //         {
    //           id: "ll7rty",
    //           title: "Image for secondary keyword",
    //           cards: [
    //             {
    //               id: "carymshftrsd-1",
    //               title: "Images for title",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "cetardmyfa-2",
    //               title: "Images for content",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "crymy4etaukard-3",
    //               title: "Images for conclusion",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //         {
    //           id: "lftgyhbg",
    //           title: "Image for lsi keyword",
    //           cards: [
    //             {
    //               id: "carhmk4ejarajed-1",
    //               title: "Images for title",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "cxhrsgard-2",
    //               title: "Images for content",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "cjetaard-3tsul",
    //               title: "Images for conclusion",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       id: "board-345f",
    //       title: "Number of words for each content2",
    //       backgroundImg:
    //         "https://images.unsplash.com/photo-1703002917693-e51692232c81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNzA0MTY0ODgyfA&ixlib=rb-4.0.3&q=80&w=400&quot",
    //       visibility: "private",
    //       starred: false,
    //       viewedAt: "",
    //       lists: [
    //         {
    //           id: "lvcbvx1",
    //           title: "Image for primary keyword",
    //           cards: [
    //             {
    //               id: "cyiddiytewtutuard-1",
    //               title: "Images for title",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "cartutjugd-2",
    //               title: "Images for content",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "bsrwbcarvsd-3",
    //               title: "Images for conclusion",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //         {
    //           id: "rtwbgbgrr1",
    //           title: "Image for secondary keyword",
    //           cards: [
    //             {
    //               id: "wrcarrwbrd-1",
    //               title: "Images for title",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "crbwardnwr-2",
    //               title: "Images for content",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "cwnrard-nwt3",
    //               title: "Images for conclusion",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //         {
    //           id: "l7hy",
    //           title: "Image for lsi keyword",
    //           cards: [
    //             {
    //               id: "ctnfard-mtne1",
    //               title: "Images for title",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "ctnegard-tng2",
    //               title: "Images for content",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "cntnrard-3yrnm",
    //               title: "Images for conclusion",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       id: "brd-40dwwc",
    //       title: "Creating content2",
    //       backgroundImg:
    //         "https://images.unsplash.com/photo-1703692218696-c9f830a81f65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNzA0MTY0ODgyfA&ixlib=rb-4.0.3&q=80&w=400&quot",
    //       visibility: "private",
    //       starred: false,
    //       viewedAt: "",
    //       lists: [
    //         {
    //           id: "lihyrst-1",
    //           title: "Image for primary keyword",
    //           cards: [
    //             {
    //               id: "rwdvgrwbtenrycard-1",
    //               title: "Images for title",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "carbftejdgnd-2",
    //               title: "Images for content",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "cdgnysm.i,rydd-3",
    //               title: "Images for conclusion",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //         {
    //           id: "lhtr4h5ist-1",
    //           title: "Image for secondary keyword",
    //           cards: [
    //             {
    //               id: "cwwgvsardetw-1",
    //               title: "Images for title",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "ccxwrard-2",
    //               title: "Images for content",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "caretgetgd-3mut",
    //               title: "Images for conclusion",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //         {
    //           id: "listh54r34-1",
    //           title: "Image for lsi keyword",
    //           cards: [
    //             {
    //               id: "careqcd-wq1",
    //               title: "Images for title",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "carqwdd-qw2",
    //               title: "Images for content",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "cqwarddq-3",
    //               title: "Images for conclusion",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   id: "workspace-3",
    //   name: "Facebook ad copy creator",
    //   shortname: "45gtv",
    //   website: "",
    //   description: "",
    //   businessType: "",
    //   iconColors: {
    //     color1: randomGradientColor(),
    //     color2: randomGradientColor(),
    //   },
    //   boards: [
    //     {
    //       id: "bbhji77yh44",
    //       title: "Finding Keywords3",
    //       backgroundImg:
    //         "https://images.unsplash.com/photo-1705154580249-55990fe3a8fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzA1OTkyMDY5fA&ixlib=rb-4.0.3&q=80&w=400&quot",
    //       visibility: "public",
    //       starred: false,
    //       viewedAt: "",
    //       lists: [
    //         {
    //           id: "df33bv",
    //           title: "primary keyword",
    //           cards: [
    //             {
    //               id: "cdqagrvrward-q1",
    //               title: "APIs to be needed",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "cbthvjard-2",
    //               title: "web scrapping to be needed",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "catfrc7-3",
    //               title: "kgr kw needed",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //         {
    //           id: "grrevervlist-2",
    //           title: "Secondary keyword",
    //           cards: [
    //             {
    //               id: "cdrartd-1",
    //               title: "APIs to be needed",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "ce47ardov-2",
    //               title: "web scrapping to be needed",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "ca7urrdogy-3",
    //               title: "kgr kw needed",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //         {
    //           id: "lvrefvebisbett-2",
    //           title: "LSI keyword",
    //           cards: [
    //             {
    //               id: "cdrudardphi-1",
    //               title: "APIs to be needed",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "cfyhkyiard-uog2",
    //               title: "web scrapping to be needed",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "ciykard-uf3",
    //               title: "kgr kw needed",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       id: "mko34f5yh",
    //       title: "Finding Images3",
    //       backgroundImg:
    //         "https://images.unsplash.com/photo-1703432799866-1f788053fb3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzA0MTY0ODgyfA&ixlib=rb-4.0.3&q=80&w=400&quot",
    //       visibility: "public",
    //       starred: false,
    //       viewedAt: "",
    //       lists: [
    //         {
    //           id: "lisbtfebwrt-rt1",
    //           title: "Image for primary keyword",
    //           cards: [
    //             {
    //               id: "cardtgrsrxfhd-1",
    //               title: "Images for title",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "ctidrard-2gulj",
    //               title: "Images for content",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "dykjdcarduj-3",
    //               title: "Images for conclusion",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //         {
    //           id: "liqbeast-321",
    //           title: "Image for secondary keyword",
    //           cards: [
    //             {
    //               id: "csulard-1",
    //               title: "Images for title",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "carilwd-2",
    //               title: "Images for content",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "carsrhdhs-3",
    //               title: "Images for conclusion",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //         {
    //           id: "lfw24f4ist-f41",
    //           title: "Image for lsi keyword",
    //           cards: [
    //             {
    //               id: "cajdrd-lruf1",
    //               title: "Images for title",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "caarkydjad-2",
    //               title: "Images for content",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "caazrrd-3ljigl",
    //               title: "Images for conclusion",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       id: "3t4g5revbo",
    //       title: "Number of words for each content3",
    //       backgroundImg:
    //         "https://images.unsplash.com/photo-1703002917693-e51692232c81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNzA0MTY0ODgyfA&ixlib=rb-4.0.3&q=80&w=400&quot",
    //       visibility: "public",
    //       starred: false,
    //       viewedAt: "",
    //       lists: [
    //         {
    //           id: "li2gsfgt-1",
    //           title: "Image for primary keyword",
    //           cards: [
    //             {
    //               id: "cbsrgabfrdbf-1",
    //               title: "Images for title",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "cajtgjeauli;o;rd-2",
    //               title: "Images for content",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "cagtdwrhtrd-3",
    //               title: "Images for conclusion",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //         {
    //           id: "litqst-1nt4",
    //           title: "Image for secondary keyword",
    //           cards: [
    //             {
    //               id: "cwrbsardthegd-1",
    //               title: "Images for title",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "caewgrwdgd-2",
    //               title: "Images for content",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "cey5r'ard[-3",
    //               title: "Images for conclusion",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //         {
    //           id: "letbisetbt-b1",
    //           title: "Image for lsi keyword",
    //           cards: [
    //             {
    //               id: "cavdnrdyfn-1",
    //               title: "Images for title",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "caasvrdgbd-2",
    //               title: "Images for content",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "efearfdsfd-3",
    //               title: "Images for conclusion",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       id: "io96grvEc",
    //       title: "Creating content3",
    //       backgroundImg:
    //         "https://images.unsplash.com/photo-1703692218696-c9f830a81f65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDR8MzE3MDk5fHx8fHwyfHwxNzA0MTY0ODgyfA&ixlib=rb-4.0.3&q=80&w=400&quot",
    //       visibility: "public",
    //       starred: false,
    //       viewedAt: "",
    //       lists: [
    //         {
    //           id: "libesbger1",
    //           title: "Image for primary keyword",
    //           cards: [
    //             {
    //               id: "ceqvard-1,yjg",
    //               title: "Images for title",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "cavqevyrrtjerqqed-2",
    //               title: "Images for content",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "carjyfejd-3",
    //               title: "Images for conclusion",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //         {
    //           id: "relistbre-1",
    //           title: "Image for secondary keyword",
    //           cards: [
    //             {
    //               id: "cyjdyarjyd-1",
    //               title: "Images for title",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "caukfiuyrd-2",
    //               title: "Images for content",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "caggdhddrd-3",
    //               title: "Images for conclusion",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //         {
    //           id: "5g3rve",
    //           title: "Image for lsi keyword",
    //           cards: [
    //             {
    //               id: "sdfw-1",
    //               title: "Images for title",
    //               description:
    //                 "you need to find all the api's needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "rv-2",
    //               title: "Images for content",
    //               description:
    //                 "you need to find all the web scrapping requirement needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //             {
    //               id: "cadfhhsrdh-3",
    //               title: "Images for conclusion",
    //               description:
    //                 "you need to find all the kgr needed for the primary keyword task",
    //               coverImg: "",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
  ],
};

console.log(data);
