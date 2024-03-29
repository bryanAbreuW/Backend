const TaskModel = require('../model/TaskModel')
const {isPast} = require('date-fns');


const TaskValidation = async (req, res, next) => {

    const { macadress,type,title,description,when } = req.body

    if(!macadress)
    return res.status(500).json({error: 'Macaddress é obrigatorio'})
  
    else if(!type)
    return res.status(500).json({error: 'Type é obrigatorio'})
    
    else if(!title)
    return res.status(500).json({error: 'Title é obrigatorio'})

    else if(!description)
    return res.status(500).json({error: 'Description é obrigatorio'})

    else if(!when)
    return res.status(500).json({error: 'When é obrigatorio'})
    
    else if(isPast(new Date(when)))
    return res.status(500).json({error: 'escolha uma data e hota futura'})

    else{
        let exists;
        if(req.params.id){

            exists = await TaskModel.
            findOne({'_id': {'$ne': req.params.id},//$ne é para negação. nao precisa identificar
                     'when' : {'$eq' : new Date(when)},
                     'macadress': {'$in': macadress}           
                    });

        }else{

        exists = await TaskModel
                                .findOne({
                                          'when' : {'$eq' : new Date(when)},
                                          'macadress':{ '$in': macadress}           
                                         });
            }

        if(exists){

            return res.status(400).json({error: 'Já existe uma atividade nesse momento'});

                    }

        next();

    };
}

module.exports = TaskValidation;