const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const MacadressValidetion = require('../middlewares/MacadressValidation');
const TaskValidation = require('../middlewares/TaskValidation')

router.post('/',TaskValidation ,TaskController.create);
router.put('/:id', TaskController.update); // put para atualizar
router.get('/:id', TaskController.show);
router.delete('/:id', TaskController.delete);
router.put('/:id/:done', TaskController.done);

router.get('/filter/all', MacadressValidetion , TaskController.all);
router.get('/filter/late', MacadressValidetion , TaskController.late );
router.get('/filter/today', MacadressValidetion, TaskController.today);
router.get('/filter/week', MacadressValidetion, TaskController.week);
router.get('/filter/month', MacadressValidetion, TaskController.month);
router.get('/filter/year', MacadressValidetion, TaskController.year);


module.exports = router;