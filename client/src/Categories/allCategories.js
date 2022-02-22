const categories = [
    {   _id: '1',
        name:"technology",
        realName: "Τεχνολογία",
        image: "imagesCategories/technology.jpg",
        children:[
                    {
                        name: "phones",
                        realName: "Phones"
                    },
                    {
                        name: "pc",
                        realName: "Pc"
                    },
                    {
                        name: "photography_video",
                        realName: "Photography & Video"
                    }
                ]
    },
    {   _id: '2',
        name:"homeAndGarden",
        realName: "Σπίτι Κήπος",
        image: "",
        children:[
                    {
                        name: "eidhKouzinas",
                        realName: "Είδη Κουζίνας"
                    },
                    {
                        name: "epipla",
                        realName: "'Επιπλα"
                    },
                    {
                        name: "fotismos",
                        realName: "Φωτισμός"
                    }
                ]
    },
    {   _id: '3',
        name:"childrenAndBabies",
        realName: "Παιδικά Βρεφικά",
        image: "",
        children:[
                    {
                        name: "vivlia",
                        realName: "Παιδικά Βιβλία"
                    },
                    {
                        name: "paixnidia",
                        realName: "Παιδικά παιχνίδια"
                    },
                    {
                        name: "sxolikaEidh",
                        realName: "Σχολικά Είδη"
                    }
                ]
    }
]

export default categories;