const natural = require('natural');
const tags = require('./tags');
const PorterStemmerEs = require('../node_modules/natural/lib/natural/stemmers/porter_stemmer_es');
const classifier = new natural.BayesClassifier(PorterStemmerEs);

const italDocs   = { tag: tags.comida_italiana,
                     items: ['lasaña', 'lasagna','pastas', 'pasta', 'raviolis', 'pesto', 'carbonara',
                             'alfredo', 'marsala', 'risotto', 'risoto', 'penne', 'espagueti', 'fettuccine',
                             'canelones', 'calzonis', 'italiano']};

const mexDocs    = { tag: tags.comida_mexicana,
                     items: ['tacos', 'flautas', 'burritos', 'enchiladas', 'carnitas', 'quesadillas',
                             'nachos', 'chilli', 'mexicana', 'mexicano', 'gringas']};

const arabDocs   = { tag: tags.comida_arabe,
                     items: ['kebab', 'kafta', 'kabab', 'pita', 'falafel', 'maqluba', 'maqlube', 'arabe',
                             'tabule', 'tabbouleh', 'mutabal', 'hummus', 'kibbe']};

const sushiDocs  = { tag: tags.sushi,
                     items: ['sushi', 'tempura', 'roll']};

const fishDocs   = { tag: tags.comida_mar,
                     items: ['pescado', 'salmon', 'camarones', 'pulpo', 'calamar', 'ceviche', 'mariscos', 
                             'mojarra', 'paella', 'langostino', 'atun', 'ostras', 'cancrejo', 'langosta',
                             'trucha', 'pargo', 'jaibas']};

const empaDocs   = { tag: tags.arepas_empanadas,
                     items: ['empanada', 'arepita', 'arepa', 'empanadita']};

const perroDocs  = { tag: tags.perritos,
                     items: ['perrito', 'perro']};

const burgerDocs = { tag: tags.hamburguesas,
                     items: ['hamburguesa']};

const vegDocs    = { tag: tags.vegetariano,
                     items: ['vegetariano', 'vegetariana']};

const almuDocs   = { tag: tags.almuerzo_express,
                     items: ['corrientazo', 'ejecutivo', 'almuercito']};

const carnPDocs  = { tag: tags.carnes_parrillas,
                     items: ['carne', 'parrilla', 'churrasco', 'solomo', 'chuleta']};

const asianDosc  = { tag: tags.comida_asiatica,
                     items: ['wonton', 'noodles', 'baozi', 'thai', 'sesame', 'satay']};

const colDocs    = { tag: tags.comida_colombiana,
                    items: ['sancocho', 'frijoles', 'chicharron', 'paisa', 'changua']};

const desDocs    = { tag: tags.desayunos,
                    items: ['waffle', 'pancake', 'calentao', 'huevo', 'bacon']};

const pizzaDocs  = { tag: tags.pizza,
                   items: ['pizza']};

const sandDocs   = { tag: tags.sanduches,
                     items: ['sanduche', 'sandwich']};

const sopasDocs  = { tag: tags.sopas,
                     items: ['sopa', 'sopita', 'crema', 'cremita']};
   
const allDocs = [italDocs, mexDocs, arabDocs, sushiDocs, fishDocs, empaDocs,
                 perroDocs, burgerDocs, vegDocs, almuDocs, carnPDocs, asianDosc,
                colDocs, desDocs, pizzaDocs, sandDocs, sopasDocs];
                
allDocs.forEach( elem => {
    elem.items.forEach( item => {
        classifier.addDocument(item, elem.tag);
    });
});

module.exports = classifier;
