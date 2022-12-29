const { response } = require('express');
const res = require('express/lib/response');

const {startOfDay, endOfDay, 
       startOfWeek, endOfWeek, 
       startOfMonth, endOfMonth, startOfYear, endOfYear} = require('date-fns')
const TaskModel = require('../model/TaskModel');

const current = new Date()


class TaskController {

   async create(req, res){
    const task = new TaskModel(req.body);

    await task
            .save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error)
            })
   
   }
   

   async update(req, res){

        await TaskModel.findByIdAndUpdate({ '_id' : req.params.id }, req.body, { new: true })
         .then(response => {
             return res.status(200).json(response);
         })
         .catch(error => {
             return res.status(500).json(error);
         });


   }

   async all (req, res){

       await TaskModel.find({macadress: {'$in': req.body.macadress }}) // . find é para encontrar um valor. $in para procurar por valores que existe
                      .sort('when')// trazer organizado por when
                      .then(response => {
                        return res.status(200).json(response);
                      })
                      .catch(error => {
                        return res.status(500).json(error);
                      });  
   }      
   
   async show (req, res){
       await TaskModel.findById(req.params.id) // findById para pesquisar por id
                           .then(response =>{
                               if(response)
                                return res.status(200).json(response);
                               else   
                                return res.status(404).json({error : 'Tarefa não encontrada'});
                                            })
                           .catch(error => {
                               return res.status(500).json(error);
                           })  
                            
    }

    async delete (req, res) {
        await TaskModel.deleteOne({'id': req.params.id})
                       .then(response =>{
                        return res.status(200).json(response);
                        })
                       .catch(error => {
                           return res.status(500).json(error);
                       }); 
    
    }

    async done(req, res){
        await TaskModel.findByIdAndUpdate(
            {'_id': req.params.id},
            {'done': req.params.done},
            {new: true})
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error =>{
                return res.status(500).json(error);
            });

    }

    async late(req, res){
        await TaskModel
    .find({
        'when': {'$lt': current}, //$lt menor que
        'macadress' : {'$in': req.body.macadress}
     })
     .sort('when')
     .then( response =>{
         return res.status(200).json(response);
     })
     .catch(error => {
         return res.status(500).json(error);
     }); 

                        }

    async week(req, res){
        await TaskModel
        .find({
            'macadress': {'$in': req.body.macadress},
            'when': {'$gte': startOfDay(current), '$lt': endOfDay(current)}
        })
        .sort('when')
        .then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {
            return res.status(500).json(error);
        });

                        }

    async today(req, res){
                            await TaskModel
                            .find({
                                'macadress': {'$in': req.body.macadress},
                                'when': {'$gte': startOfDay(current), '$lt': endOfDay(current)}
                            })
                            .sort('when')
                            .then(response => {
                                return res.status(200).json(response);
                            })
                            .catch(error => {
                                return res.status(500).json(error);
                            });
                    
                      }

    async month(req, res){
        await TaskModel
         .find({
         'macadress': {'$in': req.body.macadress},
         'when': {'$gte': startOfMonth(current), '$lt': endOfMonth(current)}
                        })
         .sort('when')
         .then(response => {
              return res.status(200).json(response);
                        })
         .catch(error => {
              return res.status(500).json(error);
                        });
                
                  }

    async year(req, res){
        await TaskModel
          .find({
          'macadress': {'$in': req.body.macadress},
          'when': {'$gte': startOfDay(current), '$lt': endOfDay(current)}
                })
          .sort('when')
          .then(response => {
            return res.status(200).json(response);
                })
          .catch(error => {
            return res.status(500).json(error);
                });
    }

}

module.exports = new TaskController()