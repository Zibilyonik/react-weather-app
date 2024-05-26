const cityOptions = [
    {
        value: "36.90,30.70",
        label: "Antalya",
    },
    {
        value: "39.77,30.52",
        label: "Eskişehir",
    },
    {
        value: "41.02,28.98",
        label: "İstanbul",
    },
    {
        value: "39.93,32.87",
        label: "Ankara",
    },
    {
        value: "37.00,35.32",
        label: "Adana",
    },
    {
        value: "37.07,37.38",
        label: "Gaziantep",
    },
    {
        value: "38.42,27.14",
        label: "İzmir",
    },
    {
        value: "40.19,29.06",
        label: "Bursa",
    },
    {
        value: "37.87,32.48",
        label: "Konya",
    },
    {
        value: "36.20,36.16",
        label: "Antakya",
    },
    {
        value: "40.66,33.60",
        label: "Aksaray",
    },
    {
        value: "40.15,26.40",
        label: "Çanakkale",
    },
    {
        value: "37.91,40.23",
        label: "Diyarbakır",
    },
    {
        value: "38.67,39.22",
        label: "Elazığ",
    },
    {
        value: "41.67,26.56",
        label: "Edirne",
    },
    {
        value: "51.51,-0.13",
        label: "London",
    },
    {
        value: "48.86,2.35",
        label: "Paris",
    },
    {
        value: "40.38,-3.75",
        label: "Madrid",
    },
    {
        value: "52.52,13.41",
        label: "Berlin",
    },
    {
        value: "52.23,21.01",
        label: "Warsaw",
    },
];

export default cityOptions.sort((a, b) => a.label.localeCompare(b.label));