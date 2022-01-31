const { Op } = require("sequelize");

const cors=require('cors')
const express = require("express");
const app = express();
app.use(cors())
const port = 8080;

// sequelize initialization
const sequelize = require("./sequelize.js");

const Company = require("./models/company");
const Founder = require("./models/founder");

Company.hasMany(Founder, { as: "Founders", foreignKey: "companyId" });
Founder.belongsTo(Company, { foreignKey: "companyId" })

// Express middleware
app.use(
    express.urlencoded({
        extended: true,
    })
);

//using bodyparser middleware
app.use(express.json());

// starting the application
app.listen(port, () => {
    console.log("The server is running on http://localhost:" + port);
});

//middleware for 500 status errors.
app.use((err, req, res, next) => {
    console.error("[ERROR]:" + err);
    res.status(500).json({ message: "500 - Server Error" });
});

app.get('/sync', async (req, res) => {
    try {
        await sequelize.sync({ force: true })
        res.status(201).json({ message: 'table created' })
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

//sort function for companies by name
const sortCompanies = (a, b) => {
    var nameCompanyA = a.name.toUpperCase();
    var nameCompanyB = b.name.toUpperCase(); 
    if (nameCompanyA < nameCompanyB) {
        return -1;
    } 
    else if(nameCompanyA > nameCompanyB)
        return 1
    else
        return 0;
}

//calls for the company entity
app.get('/companies', async (req, res) => {
    try {
        const companies = await Company.findAll()
        res.status(200).json(companies)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

//call to get companies sorted in alphabetical order by name
app.get('/companiesalph', async (req, res) => {
    try {
        const companies = await Company.findAll()
        companies.sort(sortCompanies)
        res.status(200).json(companies)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.post('/companies', async (req, res, next) => {
    try {

        await Company.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.put('/companies/:cid', async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.cid)
        if (company) {
            await company.update(req.body, { fields: ['name','foundingDate'] })
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})


app.delete('/companies/:cid', async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.cid)
        if (company) {
            await company.destroy()
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.get('/companies/:cid', async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.cid)
        if (company) {
            res.status(200).json(company)

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})



//api calls for the secondary entity
app.get('/founders', async (req, res) => {
    try {
        const founders = await Founder.findAll()
        res.status(200).json(founders)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.post('/founders', async (req, res, next) => {
    try {

        await Founder.create(req.body)
        res.status(201).json({ message: 'created' })
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})

app.put('/founders/:fid', async (req, res) => {
    try {
        const founders = await Founder.findByPk(req.params.fid)
        if (founders) {
            await founders.update(req.body, { fields: ['name', 'role', 'CompanyId'] })
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})


app.delete('/founders/:fid', async (req, res) => {
    try {
        const founder = await Founder.findByPk(req.params.fid)
        if (founder) {
            await founder.destroy()
            res.status(202).json({ message: "accepted" })

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})


app.get('/founders/:fid', async (req, res) => {
    try {
        const founder = await Founder.findByPk(req.params.fid)
        if (founder) {
            res.status(200).json(founder)

        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

//api calls that modify secondary entities based on their foreign key
app.get('/companies/:cid/founders', async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.cid)
        if (company) {
            const founders = await company.getFounders()
            res.status(200).json(founders)
        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.post('/companies/:cid/founders', async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.cid)
        if (company) {
            const founder = req.body
            founder.companyId = company.id
            await Founder.create(founder)
            res.status(200).json({ message: 'created' })
        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.put('/companies/:cid/founders/:fid', async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.cid)
        if (company) {
            const founders = await company.getFounders({ id: req.params.fid })
            var founder = null
            for (var i = 0; i < founders.length; i++) {
                if (founders[i].id == req.params.fid) {
                    founder = founders[i];
                }
            }
            if (founder) {
                founder.name = req.body.name;
                founder.role = req.body.role;
                await founder.save();
                res.status(202).json({ message: "accepted" })
            } else {
                res.status(404).json({ message: "not found" })
            }
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

app.delete('/companies/:cid/founders/:fid', async (req, res) => {
    try {
        const company = await Company.findByPk(req.params.cid)
        if (company) {
            const founders = await company.getFounders({ id: req.params.fid })
            var founder = null
            for (var i = 0; i < founders.length; i++) {
                if (founders[i].id == req.params.fid) {
                    founder = founders[i];
                }
            }
            if (founder) {
                await founder.destroy()
                res.status(202).json({ message: "accepted" })
            } else {
                res.status(404).json({ message: "not found" })
            }
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({ message: 'some error occured' })
    }
})

// filtering Companies - return all the Companies that came out after a certain date and belong to a certain category

app.get('/companiesFlt/:name/:year', async (req, res) => {

    const filteringDate = new Date(`${req.params.year}-12-31`);
    const nameLike=req.params.name
    
    try {
        const companies = await Company.findAll(
            {
                where: {
                    name: { [Op.substring] : nameLike},
                    foundingDate: {
                        [Op.gt]: filteringDate
                    }
                }
            }
        )
        res.status(200).json(companies)
    } catch {
        console.warn(err);
        res.status(500).json({ message: 'some error occured' })
    }
})
