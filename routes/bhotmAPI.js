var express = require("express");
var router = express.Router();
var bmHelpers = require("../bmHelpers");

const Boy = require("../models/boy"),
    User = require("../models/user"),
    { bhotm } = require("../models/bhotm"),
    { bhotmEntry } = require("../models/bhotm");

// BHotM Index
router.get("/", function (req, res) {
    bhotm
        .find()
        .populate("submissions")
        .exec(function (err, month) {
            if (err) {
                console.log(err);
            } else {
                res.json(month);
            }
        });
});

// Month get
router.get("/month/:id", function (req, res) {
    bhotm
        .findById(req.params.id)
        .populate("submissions")
        .exec(function (err, month) {
            if (err) {
                console.log(err);
            } else {
                res.json(month);
            }
        });
});

// Month create
router.post("/month", function (req, res) {});

// Month update
router.put("/month/:id", function (req, res) {});

// Month delete
router.delete("/month/:id", function (req, res) {
    bhotm.deleteOne({ _id: req.params.id }, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: "month deleted" });
        }
    });
});

// Entry get
router.get("/entry/:id", function (req, res) {
    bhotmEntry
        .findById(req.params.id)
        .populate("boy")
        .exec(function (err, entr) {
            if (err) {
                console.log(err);
            } else {
                res.json(entr);
            }
        });
});

// Entry create
router.post("/entry", function (req, res) {
    // Process entry
    bhotmEntry.create(res.body, function (err, entr) {
        if (err) {
            console.log(err);
        } else {
            res.json(entr);
        }
    });
});

// Entry update
router.put("/entry/:id", function (req, res) {
    // Process entry
    bhotmEntry.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        function (err, entr) {
            if (err) {
                console.log(err);
            } else {
                res.json(entr);
            }
        }
    );
});

// Entry delete
router.delete("/entry/:id", function (req, res) {
    bhotmEntry.deleteOne({ _id: req.params.id }, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: "entry deleted" });
        }
    });
});

module.exports = router;