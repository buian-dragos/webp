const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const config = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const supabase = createClient(config.supabaseUrl, config.supabaseKey);

app.post('/login', async (req, res) => {
    const { username, docMovie } = req.body;
    console.log(username)
    if (!username || !docMovie) {
        return res.status(400).send('Invalid input');
    }

    try {
        const { data, error } = await supabase
            .from('authors')
            .select('*')
            .eq('author_name', username)

        if (error || data.length === 0) {
            console.error('Error logging in or user not found:', error ? error.message : 'User not found');
            return res.status(401).send('User not found');
        }
        // console.log(data[0].movielist);

        const docList = data[0].documentlist.split(", ");
        // console.log(docList)

        const movList = data[0].movielist.split(", ");

        if (!docList.includes(docMovie) && !movList.includes(docMovie) ){
            console.error('Error logging in or user not found:', error ? error.message : 'User not found');
            return res.status(401).send('User not found');
        }
        

        const user = data[0];
        res.status(200).json(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});

app.post('/addContent', async (req, res) => {
    const { auth_name, docName, docContents } = req.body;

    try {
        const contentData = {
            doc_name: docName,
            doc_contents: docContents
        };

        const { data, error } = await supabase
            .from('documents')
            .insert(contentData)
            .select();

        if (error) {
            console.error('Error adding content:', error.message);
            return res.status(500).send('Error adding content');
        }

        const { data: authorData, error: authorError } = await supabase
            .from('authors')
            .select('*')
            .eq('author_name', auth_name);

        if (authorError) {
            console.error('Error fetching author data:', authorError.message);
            return res.status(500).send('Error fetching author data');
        }

        if (authorData.length === 0) {
            return res.status(404).send('Author not found');
        }

        console.log(auth_name);
        console.log(authorData);

        const docList = authorData[0].documentlist ? authorData[0].documentlist.split(", ") : [];
        docList.push(docName);
        const updatedDocList = docList.join(", ");

        const { error: updateError } = await supabase
            .from('authors')
            .update({ documentlist: updatedDocList })
            .eq('author_name', auth_name);

        if (updateError) {
            console.error('Error updating author document list:', updateError.message);
            return res.status(500).send('Error updating author document list');
        }

        res.status(201).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});

app.post('/displayAll', async (req, res) => {
    const { auth_name } = req.body;

    try {
        const { data, error } = await supabase
            .from('authors')
            .select('*')
            .eq('author_name', auth_name);

        if (error || data.length === 0) {
            console.error('Error logging in or user not found:', error ? error.message : 'User not found');
            return res.status(401).send('User not found');
        }

        const docList = data[0].documentlist.split(", ");
        const movList = data[0].movielist.split(", ");

        console.log("aaa")
        console.log(movList);

        const docPromises = docList.map(docName => 
            supabase
                .from('documents')
                .select('*')
                .eq('doc_name', docName)
        );

        const moviePromises = movList.map(movieName => 
            supabase
                .from('movies')
                .select('*')
                .eq('movie_title', movieName)
        );

        const [docResults, movieResults] = await Promise.all([
            Promise.all(docPromises),
            Promise.all(moviePromises)
        ]);

        const docsData = docResults.map(result => result.data).flat();
        const moviesData = movieResults.map(result => result.data).flat();

        console.log(docsData);
        console.log(moviesData);

        res.status(200).json({ documents: docsData, movies: moviesData });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});

app.post('/displayMost', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('authors')
            .select('documentlist');

        if (error) {
            console.error('Error fetching data:', error.message);
            return res.status(500).send('Error fetching data');
        }

        const documentCount = {};

        // Count the occurrences of each document
        data.forEach(entry => {
            const documents = entry.documentlist.split(', ');
            documents.forEach(doc => {
                if (documentCount[doc]) {
                    documentCount[doc]++;
                } else {
                    documentCount[doc] = 1;
                }
            });
        });

        let maxCount = 0;
        let mostAuthoredDocument = '';

        for (const [doc, count] of Object.entries(documentCount)) {
            if (count > maxCount) {
                maxCount = count;
                mostAuthoredDocument = doc;
            }
        }

        console.log(mostAuthoredDocument)

        const { data: docData, error: docError } = await supabase
            .from('documents')
            .select('*')
            .eq('doc_name', mostAuthoredDocument)

        console.log(docData[0].doc_name)

        const docContents = docData[0].docContents

        const temp = docData[0]

        res.status(200).json({ temp });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
