const express = require('express')
const router = express.Router();
const Guitar = require('../models/guitars.js');
const guitarSeed = require('../models/guitarSeed.js')


////// custom middleware for login authentication //////
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

router.get('/seed', (req, res) => {
  Guitar.create(guitarSeed, (err, data) => {
    res.redirect('/guitars')
  })
})

/*===================
Index Route
====================*/

router.get('/', (req, res) => {
  Guitar.find({}, (err, allguitars) => {
    res.render('guitars/index.ejs',
      {
        guitar: allguitars,
        currentUser: req.session.currentUser
      })
  })
})
/*===================
New Route
// ====================*/
router.get('/new', (req, res) => {
  res.render('guitars/new.ejs',
  {
    currentUser: req.session.currentUser
  })
})

router.post('/', (req, res) => {
  Guitar.create(req.body, (err, newGuitar) => {
    res.redirect('/guitars')
  })
})
/*===================
EDIT Route
// ====================*/
router.get('/:id/edit', (req, res) => {
  Guitar.findById(req.params.id, (err, upgradedGuitars) => {
    res.render('guitars/edit.ejs', {
      guitar: upgradedGuitars,
      currentUser: req.session.currentUser
    })
  })
})

router.put('/:id', isAuthenticated, (req, res) => {
  Guitar.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updtatedGuitar) => {
      res.redirect('/guitars/'+ req.params.id)
    }
  )
})
/*===================
Delete Route
====================*/
router.delete('/:id', (req, res)=>{
  Guitar.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/')
  })
});
/*===================
Buy Route
====================*/
router.put('/buy/:id',(req, res) => {
  Guitar.findByIdAndUpdate(
    req.params.id,
    { $inc: { qty: -1}},
    (err, updateGuitar) => {
      res.redirect('/guitars/'+req.params.id)
    }
  )
})
/*===================
Show Route
====================*/
router.get('/:id', (req, res) => {
  if(req.session.currentUser) {
    Guitar.findById(req.params.id, (err, foundGuitar) => {
      res.render('guitars/show.ejs',
      {
        guitars: foundGuitar,
        currentUser: req.session.currentUser
      })
    })
  } else {
    res.redirect('/sessions/new')
  }
})


module.exports = router
