const programmeList = [
    {
        "no": 1,
        "code": "016",
        "name": "BACHELOR OF ARCHITECTURE",
        "school": "USAP",
    },
    {
        "no": 2,
        "code": "097",
        "name": "MASTER OF TECHNOLOGY",
        "school": "USBAS",
        "course": "ENGINEERING PHYSICS"
    },
    {
        "no": 3,
        "code": "010",
        "name": "MASTER OF TECHNOLOGY",
        "school": "USBAS",
        "course": "NANOSCIENCE AND TECHNOLOGY"
    },
    {
        "no": 4,
        "code": "904",
        "name": "DOCTOR OF PHILOSOPHY",
        "school": "USBAS",
        "course": "PHYSICS"
    },
    {
        "no": 5,
        "code": "905",
        "name": "DOCTOR OF PHILOSOPHY",
        "school": "USBAS",
        "course": "CHEMISTRY"
    },
    {
        "no": 6,
        "code": "945",
        "name": "DOCTOR OF PHILOSOPHY",
        "school": "USBAS",
        "course": "MATHEMATICS"
    },
    {
        "no": 7,
        "code": "013",
        "name": "BACHELOR OF TECHNOLOGY",
        "school": "USBT",
        "course": "BIOTECHNOLOGY"
    },
    {
        "no": 8,
        "code": "153",
        "name": "MASTER OF TECHNOLOGY",
        "school": "USBT",
        "course": "BIOTECHNOLOGY"
    },
    {
        "no": 9,
        "code": "911",
        "name": "DOCTOR OF PHILOSOPHY",
        "school": "USBT",
        "course": "BIO-TECHNOLOGY"
    },
    {
        "no": 10,
        "code": "004",
        "name": "B.TECH/M.TECH",
        "school": "USCT",
        "course": "BIOCHEMICAL ENGINEERING (DUAL DEGREE)"
    },
    {
        "no": 11,
        "code": "095",
        "name": "MASTER OF TECHNOLOGY",
        "school": "USCT",
        "course": "CHEMICAL ENGINEERING"
    },
    {
        "no": 12,
        "code": "014/214",
        "name": "B.TECH/M.TECH",
        "school": "USCT",
        "course": "CHEMICAL ENGINEERING (DUAL DEGREE)"
    },
    {
        "no": 13,
        "code": "919",
        "name": "DOCTOR OF PHILOSOPHY",
        "school": "USCT",
        "course": "CHEMICAL ENGINEERING"
    },
    {
        "no": 14,
        "code": "001",
        "name": "MASTER OF EDUCATION",
        "school": "USE",
    },
    {
        "no": 15,
        "code": "907",
        "name": "DOCTOR OF PHILOSOPHY",
        "school": "USE",
        "course": "EDUCATION"
    },
    {
        "no": 16,
        "code": "003",
        "name": "MASTER OF SCIENCE",
        "school": "USEM",
        "course": "BIODIVERSITY AND CONSERVATION"
    },
    {
        "no": 17,
        "code": "047",
        "name": "MASTER OF SCIENCE",
        "school": "USEM",
        "course": "ENVIRONMENT MANAGEMENT"
    },
    {
        "no": 18,
        "code": "247",
        "name": "MASTER OF SCIENCE",
        "school": "USEM",
        "course": "NATURAL RESOURCE MANAGEMENT"
    },
    {
        "no": 19,
        "code": "910",
        "name": "DOCTOR OF PHILOSOPHY",
        "school": "USEM",
        "course": "ENVIRONMENTAL SCIENCES"
    },
    {
        "no": 20,
        "code": "307",
        "name": "MASTER OF ARTS",
        "school": "USHSS",
        "course": "ECONOMICS"
    },
    {
        "no": 21,
        "code": "261",
        "name": "MASTER OF PHILOSOPHY",
        "school": "USHSS",
        "course": "ENGLISH"
    },
    {
        "no": 22,
        "code": "109",
        "name": "MASTER OF ARTS",
        "school": "USHSS",
        "course": "ENGLISH"
    },
    {
        "no": 23,
        "code": "902",
        "name": "DOCTOR OF PHILOSOPHY",
        "school": "USHSS",
        "course": "ENGLISH"
    },
    {
        "no": 24,
        "code": "042",
        "name": "MASTER OF TECHNOLOGY",
        "school": "USICT",
        "course": "ELECTRONICS AND COMMUNICATION ENGINEERING (WEEKEND)"
    },
    {
        "no": 25,
        "code": "128",
        "name": "B.TECH/M.TECH",
        "school": "USICT",
        "course": "ELECTRONICS AND COMMUNICATIONS ENGINEERING (DUAL DEGREE)"
    },
    {
        "no": 26,
        "code": "032",
        "name": "B.TECH/M.TECH",
        "school": "USICT",
        "course": "COMPUTER SCIENCE ENGINEERING (DUAL DEGREE)"
    },
    {
        "no": 27,
        "code": "015",
        "name": "B.TECH/M.TECH",
        "school": "USICT",
        "course": "INFORMATION TECHNOLGY (DUAL DEGREE)"
    },
    {
        "no": 28,
        "code": "142",
        "name": "MASTER OF TECHNOLOGY",
        "school": "USICT",
        "course": "ELECTRONICS AND COMMUNICATION ENGINEERING"
    },
    {
        "no": 29,
        "code": "187",
        "name": "MASTER OF TECHNOLOGY",
        "school": "USICT",
        "course": "ROBOTICS AND AUTOMATION"
    },
    {
        "no": 30,
        "code": "045",
        "name": "MASTER OF COMPUTER APPLICATIONS",
        "school": "USICT",
        "course": "SOFTWARE ENGINEERING"
    },
    {
        "no": 31,
        "code": "048",
        "name": "MASTER OF TECHNOLOGY",
        "school": "USICT",
        "course": "COMPUTER SCIENCE AND ENGINEERING"
    },
    {
        "no": 32,
        "code": "053",
        "name": "MASTER OF TECHNOLOGY",
        "school": "USICT",
        "course": "INFORMATION TECHNOLOGY"
    },
    {
        "no": 33,
        "code": "248",
        "name": "MASTER OF TECHNOLOGY",
        "school": "USICT",
        "course": "COMPUTER SCIENCE AND ENGINEERING (WEEKEND)"
    },
    {
        "no": 34,
        "code": "940/923/922",
        "name": "DOCTOR OF PHILOSOPHY",
        "school": "USICT",
        "course": "IT/CSE/COMPUTER APPLICATIONS"
    },
    {
        "no": 35,
        "code": "946",
        "name": "DOCTOR OF PHILOSOPHY",
        "school": "USICT",
        "course": "MECHANICAL AND AUTOMATION ENGINEERING"
    },
    {
        "no": 36,
        "code": "933",
        "name": "DOCTOR OF PHILOSOPHY",
        "school": "USICT",
        "course": "ELECTRONICS AND COMMUNICATION"
    },
    {
        "no": 37,
        "code": "170",
        "name": "MASTER OF LAW",
        "school": "USLLS",
        "course": "CYBER LAW AND IPR (WEEKEND)"
    },
    {
        "no": 38,
        "code": "035",
        "name": "INTEGRATED (BACHELOR OF BUSINESS ADMINISTRATION) - (BACHELOR OF LAW)",
        "school": "USLLS",
    },
    {
        "no": 39,
        "code": "038",
        "name": "INTEGRATED (BACHELOR OF ARTS) - (BACHELOR OF LAW) ",
        "school": "USLLS",
    },
    {
        "no": 40,
        "code": "070",
        "name": "MASTER OF LAW",
        "school": "USLLS",
    },
    {
        "no": 41,
        "code": "908",
        "name": "DOCTOR OF PHILOSOPHY",
        "school": "USLLS",
        "course": "LAW AND LEGAL STUDIES"
    },
    {
        "no": 42,
        "code": "140",
        "name": "MASTER OF ARTS",
        "school": "USMC",
        "course": "MASS COMMUNICATION"
    },
    {
        "no": 43,
        "code": "944",
        "name": "DOCTOR OF PHILOSOPHY",
        "school": "USMC",
        "course": "MASS COMMUNICATION"
    },
    {
        "no": 44,
        "code": "039",
        "name": "MASTER OF BUSINESS ADMINISTRATION",
        "school": "USMS",
    },
    {
        "no": 45,
        "code": "407",
        "name": "POST GRADUATE DIPLOMA IN ENTREPRENEURSHIP AND STARTUP",
        "school": "USMS",
    },
    {
        "no": 46,
        "code": "406",
        "name": "POST GRADUATE DIPLOMA IN DATA ANALYTICS",
        "school": "USMS",
    },
    {
        "no": 47,
        "code": "594",
        "name": "MASTER OF BUSINESS ADMINISTRATION",
        "school": "USMS",
        "course": "FINANCIAL ANALYSIS"
    },
    {
        "no": 48,
        "code": "909",
        "name": "DOCTOR OF PHILOSOPHY",
        "school": "USMS",
        "course": "MANAGEMENT"
    },
    {
        "no": 49,
        "code": "404",
        "name": "POST GRADUATE DIPLOMA",
        "school": "USMS",
        "course": "HEALTH CARE MANAGEMENT (WEEKEND)"
    },
    {
        "no": 50,
        "code": "886",
        "name": "MASTER OF BUSINESS ADMINISTRATION",
        "school": "CDMS",
        "course": "DISASTER MANAGEMENT (WEEKEND)"
    },
    {
        "no": 51,
        "code": "408",
        "name": "POST GRADUATE DIPLOMA",
        "school": "CDMS",
        "course": "FIRE AND LIFE SAFETY AUDIT"
    },
    {
        "no": 52,
        "code": "964",
        "name": "DOCTOR OF PHILOSOPHY",
        "school": "CDMS",
        "course": "DISASTER MANAGEMENT"
    },
    {
        "no": 53,
        "code": "296",
        "name": "MASTER OF SCIENCE",
        "school": "CEPS",
        "course": "MEDICINAL CHEMISTRY AND DRUG DESIGN"
    },
    {
        "no": 54,
        "code": "965",
        "name": "DOCTOR OF PHILOSOPHY",
        "school": "CEPS",
        "course": "PHARMACEUTICAL CHEMISTRY"
    },
    {
        "no": 55,
        "code": "405",
        "name": "POST GRADUATE DIPLOMA",
        "school": "USMS",
        "course": "EQUITY RESEARCH"
    }
]


export { programmeList }