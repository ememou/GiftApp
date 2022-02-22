const categories = [
    {
        _id: '1',
        name:"technology",
        realName: "Τεχνολογία",
        image: "",
        path: "Technology"
    },
    {
        _id: '2',
        name:"smartwatches",
        realName:"Smartwatches",
        image: "",
        path: "Technology/Smartwatches",
        categoryBelongs: [
            {
                name: "technology",
                realName: "Τεχνολογία"
            }
        ]
    },
    {
        _id: '3',
        name:"phones",
        realName:"Phones",
        image: "",
        path: "Technology/Phones",
        categoryBelongs: [
            {
                name: "technology",
                realName: "Τεχνολογία"
            }
        ]
    },
    {
        _id: '4',
        name:"pc",
        realName:"Pc",
        image: "",
        path: "Technology/Pc",
        categoryBelongs: [
            {
                name: "technology",
                realName: "Τεχνολογία"
            }
        ]
    },
    {
        _id: '5',
        name:"photography_video",
        realName:"Photography & Video",
        image: "",
        path: "Technology/PhotographyAndVideo",
        categoryBelongs: [
            {
                name: "technology",
                realName: "Τεχνολογία"
            }
        ]
    },
    {
        _id: '49',
        name:"gaming",
        realName:"Gaming",
        image: "",
        path: "Technology/Gaming",
        categoryBelongs: [
            {
                name: "technology",
                realName: "Τεχνολογία"
            }
        ]
    },
    {
        _id: '50',
        name:"konsolesGaming",
        realName:"Κονσόλες",
        image: "",
        path: "Technology/Gaming/KonsolesGaming",
        categoryBelongs: [
            {
                name: "technology",
                realName: "Τεχνολογία"
            },
            {
                name: "gaming",
                realName: "Gaming"
            },
        ]
    },
    {
        _id: '51',
        name:"aksesouarKonsolas",
        realName:"Αξεσουάρ Κονσολών",
        image: "",
        path: "Technology/Gaming/AksesouarKonsolas",
        categoryBelongs: [
            {
                name: "technology",
                realName: "Τεχνολογία"
            },
            {
                name: "gaming",
                realName: "Gaming"
            },
        ]
    }
    ,
    {
        _id: '6',
        name:"mobilephones",
        realName:"Mobile Phones",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/af/Mobile_phone.jpg",
        path: "Technology/Phones/MobilePhones",
        categoryBelongs: [
            {
                name: "technology",
                realName: "Τεχνολογία"
            },
            {
                name: "phones",
                realName: "Phones"
            },
        ]
    },
    {
        _id: '7',
        name:"stablephones",
        realName: "Stable Phones",
        image: "",
        path: "Technology/Phones/StablePhones",
        categoryBelongs: [
            {
                name: "technology",
                realName: "Τεχνολογία"
            },
            {
                name: "phones",
                realName: "Phones"
            },
        ]
    },
    {
        _id: '8',
        name:"periferiaca",
        realName: "Περιφερειακά",
        image: "",
        path: "Technology/Pc/Periferiaca",
        categoryBelongs: [
            {
                name: "technology",
                realName: "Τεχνολογία"
            },
            {
                name: "pc",
                realName: "Pc"
            },
        ]
    },
    {
        _id: '9',
        name:"laptops",
        realName:"Laptops",
        image: "",
        path: "Technology/Pc/Laptops",
        categoryBelongs: [
            {
                name: "technology",
                realName: "Τεχνολογία"
            },
            {
                name: "pc",
                realName: "Pc"
            },
        ]
    },
    {
        _id: '10',
        name:"tablets",
        realName:"Tablets",
        image: "",
        path: "Technology/Tablets",
        categoryBelongs: [
            {
                name: "technology",
                realName: "Τεχνολογία"
            }
        ]
    },
    {
        _id: '11',
        name:"mouse",
        realName: "Mouse",
        image: "",
        path: "Technology/Pc/Periferiaca/Mouse",
        categoryBelongs: [
            {
                name: "technology",
                realName: "Τεχνολογία"
            },
            {
                name: "pc",
                realName: "Pc"
            },
            {
                name: "periferiaca",
                realName: "Περιφερειακα"
            },
        ]
    },
    {
        _id: '12',
        name: "keyboard",
        realName: "Keyboard",
        image: "",
        path: "Technology/Pc/Periferiaca/Keyboard",
        categoryBelongs: [
            {
                name: "technology",
                realName: "Τεχνολογία"
            },
            {
                name: "pc",
                realName: "Pc"
            },
            {
                name: "periferiaca",
                realName: "Περιφερειακα"
            },
        ]
    },
    {
        _id: '13',
        name:"photocameras",
        realName:"Photo Cameras",
        image: "",
        path: "Technology/PhotographyAndVideo/Photocameras",
        categoryBelongs: [
            {
                name: "technology",
                realName: "Τεχνολογία"
            },
            {
                name: "photography_video",
                realName: "Photography & Video"
            }
        ]
    },
    {
        _id: '14',
        name:"videocameras",
        realName: "Video Cameras",
        image: "",
        path: "Technology/PhotographyAndVideo/Videocameras",
        categoryBelongs: [
            {
                name: "technology",
                realName: "Τεχνολογία"
            },
            {
                name: "photography_video",
                realName: "Photography & Video"
            }
        ]
    },
    /////////////////////////////////////////////////////////////////////
    {
        _id: '15',
        name:"homeAndGarden",
        realName: "Σπίτι Κήπος",
        image: "https://image.shutterstock.com/image-photo/house-placed-on-coins-notebook-260nw-1145377112.jpg",
        path: "HomeAndGarden"
    },
    //Πρώτες Υποκατηγορίες HomeAndGarden
    {
        _id: '16',
        name:"eidhKouzinas",
        realName:"Είδη Κουζίνας",
        image: "",
        path: "HomeAndGarden/EidhKouzinas",
        categoryBelongs: [
            {
                name: "homeAndGarden",
                realName: "Σπίτι Κήπος"
            }
        ]
    },
    {
        _id: '17',
        name:"epipla",
        realName:"Έπιπλα",
        image: "",
        path: "HomeAndGarden/Epipla",
        categoryBelongs: [
            {
                name: "homeAndGarden",
                realName: "Σπίτι Κήπος"
            }
        ]
    },
    {
        _id: '18',
        name:"fotismos",
        realName:"Φωτισμός",
        image: "",
        path: "HomeAndGarden/Fotismos",
        categoryBelongs: [
            {
                name: "homeAndGarden",
                realName: "Σπίτι Κήπος"
            }
        ]
    },
    // HomeAndGarden/EidhKouzinas
    {
        _id: '19',
        name:"maxairia",
        realName:"Μαχαίρια",
        image: "",
        path: "HomeAndGarden/EidhKouzinas/Maxairia",
        categoryBelongs: [
            {
                name: "homeAndGarden",
                realName: "Σπίτι Κήπος"
            },
            {
                name: "eidhKouzinas",
                realName: "Είδη Κουζίνας"
            },
        ]
    },
    {
        _id: '20',
        name:"koutalia",
        realName: "Κουτάλια",
        image: "",
        path: "HomeAndGarden/EidhKouzinas/Koutalia",
        categoryBelongs: [
            {
                name: "homeAndGarden",
                realName: "Σπίτι Κήπος"
            },
            {
                name: "eidhKouzinas",
                realName: "Είδη Κουζίνας"
            },
        ]
    },
    {
        _id: '21',
        name:"pirounia",
        realName: "Πιρούνια",
        image: "",
        path: "HomeAndGarden/EidhKouzinas/Pirounia",
        categoryBelongs: [
            {
                name: "homeAndGarden",
                realName: "Σπίτι Κήπος"
            },
            {
                name: "eidhKouzinas",
                realName: "Είδη Κουζίνας"
            },
        ]
    },
    // HomeAndGarden/Epipla 
    {
        _id: '22',
        name:"epiplaSaloniou",
        realName: "Έπιπλα Σαλονιού",
        image: "",
        path: "HomeAndGarden/Epipla/EpiplaSaloniou",
        categoryBelongs: [
            {
                name: "homeAndGarden",
                realName: "Σπίτι Κήπος"
            },
            {
                name: "epipla",
                realName: "Έπιπλα"
            },
        ]
    },
    {
        _id: '23',
        name:"epiplaGrafeiou",
        realName:"Έπιπλα Γραφείου",
        image: "",
        path: "HomeAndGarden/Epipla/EpiplaGrafeiou",
        categoryBelongs: [
            {
                name: "homeAndGarden",
                realName: "Σπίτι Κήπος"
            },
            {
                name: "epipla",
                realName: "Έπιπλα"
            },
        ]
    },
    {
        _id: '24',
        name:"epiplaKrevatokamaras",
        realName:"Έπιπλα Κρεβατοκάμαρας",
        image: "",
        path: "HomeAndGarden/Epipla/EpiplaKrevatokamaras",
        categoryBelongs:  [
            {
                name: "homeAndGarden",
                realName: "Σπίτι Κήπος"
            },
            {
                name: "epipla",
                realName: "Έπιπλα"
            }
        ]
    },
    // HomeAndGarden/Fotismos 
    {
        _id: '26',
        name: "fotistikaEswterikouXwrou",
        realName: "Φωτιστικά Εσωτερικού Χώρου",
        image: "",
        path: "HomeAndGarden/Fotismos/FotistikaEswterikouXwrou",
        categoryBelongs: [
            {
                name: "homeAndGarden",
                realName: "Σπίτι Κήπος"
            },
            {
                name: "fotismos",
                realName: "Φωτισμός"
            }
        ]
    },
    {
        _id: '27',
        name:"fotistikaEkswterikouXwrou",
        realName:"Φωτιστικά Εξωτερικού Χώρου",
        image: "",
        path: "HomeAndGarden/Fotismos/FotistikaEkswterikouXwrou",
        categoryBelongs: [
            {
                name: "homeAndGarden",
                realName: "Σπίτι Κήπος"
            },
            {
                name: "fotismos",
                realName: "Φωτισμός"
            }
        ]
    },
    {
        _id: '28',
        name:"fakoiFotismou",
        realName: "Φακοί Φωτισμού",
        image: "",
        path: "HomeAndGarden/Fotismos/FakoiFotismou",
        categoryBelongs: [
            {
                name: "homeAndGarden",
                realName: "Σπίτι Κήπος"
            },
            {
                name: "fotismos",
                realName: "Φωτισμός"
            }
        ]
    },
    // HomeAndGarden/Epipla/ΕpiplaSaloniou
    {
        _id: '29',
        name:"kanapedes",
        realName: "Καναπέδες",
        image: "",
        path: "HomeAndGarden/Epipla/EpiplaSaloniou/Kanapedes",
        categoryBelongs: [
            {
                name: "homeAndGarden",
                realName: "Σπίτι Κήπος"
            },
            {
                name: "epipla",
                realName: "Έπιπλα"
            },
            {
                name: "epiplaSaloniou",
                realName: "Έπιπλα Σαλονιού"
            }
        ]
    },
    {
        _id: '30',
        name:"polithrones",
        realName: "Πολυθρόνες",
        image: "",
        path: "HomeAndGarden/Epipla/EpiplaSaloniou/Polithrones",
        categoryBelongs: [
            {
                name: "homeAndGarden",
                realName: "Σπίτι Κήπος"
            },
            {
                name: "epipla",
                realName: "Έπιπλα"
            },
            {
                name: "epiplaSaloniou",
                realName: "Έπιπλα Σαλονιού"
            }
        ]
    },
    // HomeAndGarden/Epipla/EpiplaGrafeiou
    {
        _id: '31',
        name:"grafeia",
        realName: "Γραφεία",
        image: "",
        path: "HomeAndGarden/Epipla/EpiplaGrafeiou/Grafeia",
        categoryBelongs: [
            {
                name: "homeAndGarden",
                realName: "Σπίτι Κήπος"
            },
            {
                name: "epipla",
                realName: "Έπιπλα"
            },
            {
                name: "epiplaGrafeiou",
                realName: "Έπιπλα Γραφείου"
            }
        ]
    },
    {
        _id: '32',
        name:"vivliothikesKaiRafia",
        realName: "Βιβλιοθήκες και Ράφια",
        image: "",
        path: "HomeAndGarden/Epipla/ΕpiplaGrafeiou/VivliothikesKaiRafia",
        categoryBelongs: [
            {
                name: "homeAndGarden",
                realName: "Σπίτι Κήπος"
            },
            {
                name: "epipla",
                realName: "Έπιπλα"
            },
            {
                name: "epiplaGrafeiou",
                realName: "Έπιπλα Γραφείου"
            }
        ]
    },
    {
        _id: '33',
        name:"krevatia",
        realName: "Κρεβάτια",
        image: "",
        path: "HomeAndGarden/Epipla/EpiplaKrevatokamaras/Krevatia",
        categoryBelongs: [
            {
                name: "homeAndGarden",
                realName: "Σπίτι Κήπος"
            },
            {
                name: "epipla",
                realName: "Έπιπλα"
            },
            {
                name: "epiplaKrevatokamaras",
                realName: "Έπιπλα Κρεβατοκάμαρας"
            }
        ]
    },
    {
        _id: '34',
        name:"strwmataUpnou",
        realName: "Στρώματα Ύπνου",
        image: "",
        path: "HomeAndGarden/Epipla/ΕpiplaKrevatokamaras/StrwmataUpnou",
        categoryBelongs: [
            {
                name: "homeAndGarden",
                realName: "Σπίτι Κήπος"
            },
            {
                name: "epipla",
                realName: "Έπιπλα"
            },
            {
                name: "epiplaKrevatokamaras",
                realName: "Έπιπλα Κρεβατοκάμαρας"
            }
        ]
    },
    {
        _id: '35',
        name:"ntoulapesRouxwn",
        realName: "Ντουλάπες Ρούχων",
        image: "",
        path: "HomeAndGarden/Epipla/ΕpiplaKrevatokamaras/NtoulapesRouxwn",
        categoryBelongs: [
            {
                name: "homeAndGarden",
                realName: "Σπίτι Κήπος"
            },
            {
                name: "epipla",
                realName: "Έπιπλα"
            },
            {
                name: "epiplaKrevatokamaras",
                realName: "Έπιπλα Κρεβατοκάμαρας"
            }
        ]
    },
    ////////////////////////////////////////////////////////////////////////////////
    {
        _id: '36',
        name:"childrenAndBabies",
        realName: "Παιδικά Βρεφικά",
        image: "",
        path: "ChildrenAndBabies"
    },
    {
        _id: '37',
        name:"vivlia",
        realName:"Παιδικά Βιβλία",
        image: "",
        path: "ChildrenAndBabies/Vivlia",
        categoryBelongs: [
            {
                name: "childrenAndBabies",
                realName: "Παιδικά Βρεφικά"
            }
        ]
    },
    {
        _id: '38',
        name:"paixnidia",
        realName:"Παιδικά παιχνίδια",
        image: "",
        path: "ChildrenAndBabies/Paixnidia",
        categoryBelongs: [
            {
                name: "childrenAndBabies",
                realName: "Παιδικά Βρεφικά"
            }
        ]
    },
    {
        _id: '39',
        name:"sxolikaEidh",
        realName:"Σχολικά Είδη",
        image: "",
        path: "ChildrenAndBabies/SxolikaEidh",
        categoryBelongs: [
            {
                name: "childrenAndBabies",
                realName: "Παιδικά Βρεφικά"
            }
        ]
    },
    {
        _id: '40',
        name:"paidikaParamithia",
        realName:"Παιδικά Παραμύθια",
        image: "",
        path: "ChildrenAndBabies/Vivlia/PaidikaParamithia",
        categoryBelongs: [
            {
                name: "childrenAndBabies",
                realName: "Παιδικά Βρεφικά"
            },
            {
                name: "vivlia",
                realName: "Παιδικά Βιβλία"
            },
        ]
    },
    {
        _id: '41',
        name:"paidikaVivliaGnwsewn",
        realName: "Παιδικά Βιβλία Γνώσεων",
        image: "",
        path: "ChildrenAndBabies/Vivlia/PaidikaVivliaGnwsewn",
        categoryBelongs: [
            {
                name: "childrenAndBabies",
                realName: "Παιδικά Βρεφικά"
            },
            {
                name: "vivlia",
                realName: "Παιδικά Βιβλία"
            },
        ]
    },
    {
        _id: '42',
        name:"epitrapeziaKaiPuzzles",
        realName: "Επιτραπέζια, Γρίφοι & Puzzles",
        image: "",
        path: "ChildrenAndBabies/Paixnidia/EpitrapeziaKaiPuzzles",
        categoryBelongs: [
            {
                name: "childrenAndBabies",
                realName: "Παιδικά Βρεφικά"
            },
            {
                name: "paixnidia",
                realName: "Παιδικά παιχνίδια"
            },
        ]
    },
    {
        _id: '43',
        name:"vrefikaPaixnidia",
        realName: "Βρεφικά Παιχνίδια",
        image: "",
        path: "ChildrenAndBabies/Paixnidia/VrefikaPaixnidia",
        categoryBelongs: [
            {
                name: "childrenAndBabies",
                realName: "Παιδικά Βρεφικά"
            },
            {
                name: "paixnidia",
                realName: "Παιδικά παιχνίδια"
            },
        ]
    },
    {
        _id: '44',
        name:"mousikaPaixnidia",
        realName:"Μουσικά Παιχνίδια",
        image: "",
        path: "ChildrenAndBabies/Paixnidia/MousikaPaixnidia",
        categoryBelongs: [
            {
                name: "childrenAndBabies",
                realName: "Παιδικά Βρεφικά"
            },
            {
                name: "paixnidia",
                realName: "Παιδικά παιχνίδια"
            },
        ]
    },
    {
        _id: '45',
        name:"grafikiIli",
        realName:"Γραφική Ύλη",
        image: "",
        path: "ChildrenAndBabies/SxolikaEidh/GrafikiIli",
        categoryBelongs: [
            {
                name: "childrenAndBabies",
                realName: "Παιδικά Βρεφικά"
            },
            {
                name: "sxolikaEidh",
                realName: "Σχολικά Είδη"
            }
        ]
    },
    {
        _id: '46',
        name:"sxolikesTsantes",
        realName: "Σχολικές Τσάντες",
        image: "",
        path: "ChildrenAndBabies/SxolikaEidh/SxolikesTsantes",
        categoryBelongs: [
            {
                name: "childrenAndBabies",
                realName: "Παιδικά Βρεφικά"
            },
            {
                name: "sxolikaEidh",
                realName: "Σχολικά Είδη"
            }
        ]
    },
    {
        _id: '47',
        name: "eidhArxeiothetisis",
        realName: "Είδη Αρχειοθέτησης",
        image: "",
        path: "ChildrenAndBabies/SxolikaEidh/EidhArxeiothetisis",
        categoryBelongs: [
            {
                name: "childrenAndBabies",
                realName: "Παιδικά Βρεφικά"
            },
            {
                name: "sxolikaEidh",
                realName: "Σχολικά Είδη"
            }
        ]
    },
    {
        _id: '48',
        name:"eidhSxediou",
        realName:"Είδη Σχεδίου",
        image: "",
        path: "ChildrenAndBabies/SxolikaEidh/EidhSxediou",
        categoryBelongs: [
            {
                name: "childrenAndBabies",
                realName: "Παιδικά Βρεφικά"
            },
            {
                name: "sxolikaEidh",
                realName: "Σχολικά Είδη"
            }
        ]
    }

]

export default categories;