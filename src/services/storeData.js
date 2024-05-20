const { Firestore } = require('@google-cloud/firestore');
 
async function storeData(id, data) {
  const db = new Firestore();
 
  const predictions = db.collection('predictions');
  return predictions.doc(id).set(data);
}

async function getData() {
  const db = new Firestore();
  const predictions = db.collection('predictions');

  try {
    // get all prediction
    const snapshot = await predictions.get();

    // convert snapshot data into array of objects
    const data = [];
    snapshot.forEach(doc => {
        data.push({
            id: doc.id,
            history: doc.data()
        });
    });

    return data;
} catch (error) {
    console.error('Error while fetching data:', error);
    throw new InputError(`Terjadi kesalahan dalam melakukan prediksi`);
}
}
 
module.exports = { getData, storeData };