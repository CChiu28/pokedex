// function LoginToDB(info) {
//     const obj = JSON.stringify(info);
//     console.log(obj)
//     fetch('http://localhost:8080/api/getUser', {
//         method: 'GET',
//         headers: {
//             "Content-type":"application/json",
//             'Accept': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Authorization': `Bearer ${info.jwt}`
//         },
//     }).then(res => res.text()).then(data => console.log(data));
// }

async function getFetch(url, method, body) {
    let getHeaders = {
        method: 'GET'
    };
    if (method==='POST') {
        getHeaders = {
            method: "POST",
            headers: {
                "Content-type":"application/json",
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: body
        }
    }
    const data = await fetch(url, getHeaders);
    const res = data.json();
    console.log(res)
    return res;
}

function formatText(text) {
    let textArr = text.split('-');
    textArr = textArr.map(word => word[0].toUpperCase()+word.slice(1,word.length));
    return textArr.join(' ');
}

function getTypeStrengthAndWeakness(type) {
    switch (type) {
        case 'normal':
            return {
                'vulnerable': ['fighting'],
                'resist': [],
                'weak': ['rock','steel'],
                'strong': [],
                'zero': ['ghost']
            }
        case 'water':
            return {
                'vulnerable': ['grass','electric'],
                'resist': ['fire','water','ice','steel'],
                'weak': ['water','grass','dragon'],
                'strong': ['fire','ground','rock'],
                'zero': []
            }
        case 'fire':
            return {
                'vulnerable': ['water','ground','rock'],
                'resist': ['fire','grass','ice','bug','steel','fairy'],
                'weak': ['water','fire','dragon','rock'],
                'strong': ['grass','ice','bug','steel'],
                'zero': []
            }
        case 'grass':
            return {
                'vulnerable': ['fire','ice','poison','flying','bug'],
                'resist': ['water','electric','grass','ground'],
                'weak': ['fire','grass','poison','flying','bug','dragon','steel'],
                'strong': ['water','ground','rock'],
                'zero': []
            }
        case 'electric':
            return {
                'vulnerable': ['ground'],
                'resist': ['electric','flying','steel'],
                'weak': ['electric','grass','dragon','ground'],
                'strong': ['water','flying'],
                'zero': []
            }
        case 'ice':
            return {
                'vulnerable': ['fire','fighting','rock','steel'],
                'resist': ['ice'],
                'weak': ['fire','water','ice','steel'],
                'strong': ['grass','ground','flying','dragon'],
                'zero': []
            }
        case 'fighting':
            return {
                'vulnerable': ['flying','psychic','fairy'],
                'resist': ['bug','rock','dark'],
                'weak': ['poison','flying','psychic','bug','fairy'],
                'strong': ['normal','ice','rock','dark','steel'],
                'zero': []
            }
        case 'poison':
            return {
                'vulnerable': ['ground','psychic'],
                'resist': ['grass','fighting','poison','bug','fairy'],
                'weak': ['poison','ground','rock','ghost','steel'],
                'strong': ['grass','fairy'],
                'zero': []
            }
        case 'ground':
            return {
                'vulnerable': ['water','grass','ice'],
                'resist': ['poison','rock'],
                'weak': ['flying','grass','bug'],
                'strong': ['fire','electric','poison','rock','steel'],
                'zero': ['electric']
            }
        case 'flying':
            return {
                'vulnerable': ['electric','ice','rock'],
                'resist': ['grass','fighting','bug'],
                'weak': ['electric','rock','steel'],
                'strong': ['grass','fighting','bug'],
                'zero': ['ground']
            }
        case 'psychic':
            return {
                'vulnerable': ['bug','ghost','dark'],
                'resist': ['fighting','psychic'],
                'weak': ['dark','psychic','steel'],
                'strong': ['fighitng','poison'],
                'zero': []
            }
        case 'bug':
            return {
                'vulnerable': ['fire','flying','rock'],
                'resist': ['grass','fighting','ground'],
                'weak': ['fire','fighitng','poison','flying','ghost','steel','fairy'],
                'strong': ['grass','psychic','dark'],
                'zero': []
            }
        case 'rock':
            return {
                'vulnerable': ['water','grass','fighting','ground','steel'],
                'resist': ['normal','fire','poison','flying'],
                'weak': ['fighting','ground','steel'],
                'strong': ['fire','ice','flying','bug'],
                'zero': []
            }
        case 'ghost':
            return {
                'vulnerable': ['ghost','dark'],
                'resist': ['poison','bug'],
                'weak': ['normal','dark'],
                'strong': ['psychic','ghost'],
                'zero': ['normal','fighting']
            }
        case 'dragon':
            return {
                'vulnerable': ['ice','dragon','fairy'],
                'resist': ['fire','water','electric','grass'],
                'weak': ['steel'],
                'strong': ['dragon'],
                'zero': []
            }
        case 'dark':
            return {
                'vulnerable': ['fighting','bug','fairy'],
                'resist': ['ghost','dark'],
                'weak': ['fighting','dark','fairy'],
                'strong': ['psychic','ghost'],
                'zero': ['psychic']
            }
        case 'steel':
            return {
                'vulnerable': ['fire','fighting','ground'],
                'resist': ['normal','grass','ice','flying','psychic','bug','rock','dragon','steel','fairy'],
                'weak': ['fire','water','electric','steel'],
                'strong': ['ice','rock','fairy'],
                'zero': ['poison']
            }
        case 'fairy':
            return {
                'vulnerable': ['poison','steel'],
                'resist': ['fighting','bug','dark'],
                'weak': ['fire','poison','steel'],
                'strong': ['fighting','dragon','dark'],
                'zero': ['dragon']
            }

    }
}

export {
    formatText,
    getTypeStrengthAndWeakness,
    getFetch
}