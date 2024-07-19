import axios from "axios";
import { Router } from "express";
import { Transaction } from "../model/transactions.schema.js";

const router = Router();

// API to get the data
router.get('/', async (req, res) => {
    try {
        const data = await Transaction.find();
        res.status(200).json({ data })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message  : 'Error while fetching data'})
    }
})

// initialize database
router.get('/data', async (req, res) => {
    try {
        const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await Transaction.deleteMany();
        await Transaction.insertMany(data); 

        res.status(200).send({ message: 'Database initialized' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Failed to initialize database' });
    }
})


// API to get statistics of the selected month
router.get('/statistics', async (req, res) => {
    const { month, year } = req.query;

    if (!month) {
        return res.status(400).send({ message: 'Month is required' });
    }

    const currentYear = new Date().getFullYear();
    const selectedYear = year || currentYear;

    try {
        const monthIndex = new Date(Date.parse(`${month} 1, ${selectedYear}`)).getMonth();
        const startDate = new Date(selectedYear, monthIndex, 1);
        const endDate = new Date(selectedYear, monthIndex + 1, 0); // Last day of the selected month

        // Find all transactions for the selected month
        const transactions = await Transaction.find({
            dateOfSale: {
                $gte: startDate,
                $lte: endDate
            }
        });

        const totalSaleAmount = transactions.reduce((acc, transaction) => acc + transaction.price, 0);
        const totalSoldItems = transactions.filter(transaction => transaction.sold).length;
        const totalUnsoldItems = transactions.length - totalSoldItems;

        res.status(200).send({
            totalSaleAmount,
            totalSoldItems,
            totalUnsoldItems,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Failed to fetch statistics' });
    }
});

// API to list all transactions with search and pagination
router.get('/transactions', async (req, res) => {
    const { search = '', page = 1, perPage = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const perPageNumber = parseInt(perPage, 10);

    const query = search
        ? {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: !isNaN(Number(search)) ? Number(search) : -1 },
            ],
        }
        : {};

    try {
        const transactions = await Transaction.find(query)
            .skip((pageNumber - 1) * perPageNumber)
            .limit(perPageNumber);
        const totalTransactions = await Transaction.countDocuments(query);

        res.status(200).send({
            transactions,
            totalTransactions,
            totalPages: Math.ceil(totalTransactions / perPageNumber),
            currentPage: pageNumber,
            perPage: perPageNumber,
        });
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch transactions', error });
    }
});

// API to get price range distribution for a selected month
router.get('/barChart', async (req, res) => {
    const { month } = req.query;
    if (!month) {
        return res.status(400).send({ message: 'Month is required' });
    }

    try {
        const monthIndex = new Date(Date.parse(`${month} 1, 2020`)).getMonth();

        const startDate = new Date(2020, monthIndex, 1);
        const endDate = new Date(2020, monthIndex + 1, 0); // Last day of the selected month

        console.log(startDate, endDate);

        // Find all transactions for the selected month regardless of the year
        const transactions = await Transaction.find({
            dateOfSale: {
                $gte: startDate,
                $lte: endDate,
            }
        });

        // Price ranges
        const priceRanges = [
            { range: '0-100', min: 0, max: 100, count: 0 },
            { range: '101-200', min: 101, max: 200, count: 0 },
            { range: '201-300', min: 201, max: 300, count: 0 },
            { range: '301-400', min: 301, max: 400, count: 0 },
            { range: '401-500', min: 401, max: 500, count: 0 },
            { range: '501-600', min: 501, max: 600, count: 0 },
            { range: '601-700', min: 601, max: 700, count: 0 },
            { range: '701-800', min: 701, max: 800, count: 0 },
            { range: '801-900', min: 801, max: 900, count: 0 },
            { range: '901-above', min: 901, max: Infinity, count: 0 },
        ];

        // Count items in each price range
        transactions.forEach(transaction => {
            const price = transaction.price;
            for (const range of priceRanges) {
                if (price >= range.min && price <= range.max) {
                    range.count++;
                    break;
                }
            }
        });

        res.status(200).send({
            priceRanges,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Failed to fetch price range distribution' });
    }
});

// API to get unique categories and number of items in each category for a selected month
router.get('/pieChart', async (req, res) => {
    const { month } = req.query;
    if (!month) {
        return res.status(400).send({ message: 'Month is required' });
    }

    try {
        const monthIndex = new Date(Date.parse(`${month} 1, 2020`)).getMonth();

        const startDate = new Date(2020, monthIndex, 1);
        const endDate = new Date(2020, monthIndex + 1, 0); // Last day of the selected month

        console.log(startDate, endDate);

        // Find all transactions for the selected month regardless of the year
        const transactions = await Transaction.find({
            dateOfSale: {
                $gte: startDate,
                $lte: endDate,
            }
        });

        // Count items in each category
        const categoryCounts = transactions.reduce((acc, transaction) => {
            const category = transaction.category || 'Uncategorized';
            if (!acc[category]) {
                acc[category] = 0;
            }
            acc[category]++;
            return acc;
        }, {});

        const categories = Object.keys(categoryCounts).map(category => ({
            category,
            count: categoryCounts[category],
        }));

        res.status(200).send({ categories });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Failed to fetch category distribution' });
    }
});




export default router;