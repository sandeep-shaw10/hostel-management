//Static data: may be implemented to db
const ROLE = {
    ADMIN: 'admin',
    STAFF: 'staff'
}

const GENDER = {
    M: 'Boys',
    F: 'Girls'
}

const COURSE = {
    BT: 'B.Tech',
    MT: 'M. Tech'
}

const BRANCH = {
    CT: 'Ceramic Technology',
    IT: 'Information Technology',
    CSE: 'Computer Science & Engineering'
}

const FEE = [
    {
        start_date: "2014-01-01T13:39:49.333Z",
        end_date: "2020-04-01T13:39:49.333Z",
        charge: 1500
    },
    {
        start_date: "2020-05-01T13:39:49.333Z",
        end_date: "2022-03-01T13:39:49.333Z",
        charge: null
    },
    {
        start_date: "2022-04-01T13:39:49.333Z",
        end_date: null,
        charge: 1650
    }
]

const BLOCK = [
    {
        id:"1",
        name: 'Block-A',
        desc: 'Wifi, Single-Bed ....',
        type: GENDER.M
    },
    {
        id:"2",
        name: 'Block-B',
        desc: 'Wifi, Single-Bed ....',
        type: GENDER.M
    },
    {
        id:"3",
        name: 'Block-C',
        desc: 'Wifi, Single-Bed ....',
        type: GENDER.M
    },
    {
        id:"4",
        name: 'Block-D',
        desc: 'Wifi, Single-Bed ....',
        type: GENDER.F
    },  
]

module.exports = {
    ROLE: ROLE,
    GENDER: GENDER,
    COURSE: COURSE,
    BRANCH: BRANCH,
    BLOCK: BLOCK,
    FEE: FEE
}