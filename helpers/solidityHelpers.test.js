const test = require('ava');
const { formatDoc } = require('./solidityHelpers');

test('Format documentation', t => {
    const doc = "@notice this is the notice\n  @dev developers doc\n@tag a generic tag";
    const formattedDoc = formatDoc(doc); 
    const correctFormattedDoc = "this is the notice\n\n@dev developers doc\n\n@tag a generic tag"; 
    t.is(formattedDoc, correctFormattedDoc);
});
