const Validator = require('fastest-validator');
const models = require('../models');

function index(req, res) {

    models.Post.findAll().then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            return res.status(404).json({
                message: "No Posts available"
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function save(req, res) {
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        userId: 1
    }

    const schema = {
        title: {type: "string", optional: false, max: "100"},
        content: {type: "string", optional: false, max: "500"},
        categoryId: {type: "number", optional: false}
    }

    const v = new Validator();
    const validationResponse = v.validate(post, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Post.create(post).then(result => {
        res.status(201).json({
            message: "Post created successfully",
            post: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function show(req, res) {
    const id = req.params.id;

    models.Post.findByPk(id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            return res.status(404).json({
                message: "Post not found",
                postId: id
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function update(req, res) {
    const id = req.params.id;
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id
    }

    const userId = 1;

    const schema = {
        title: {type: "string", optional: false, max: "100"},
        content: {type: "string", optional: false, max: "500"},
        categoryId: {type: "number", optional: false}
    }

    const v = new Validator();
    const validationResponse = v.validate(post, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Post.update(post, {
        where: { id: id, userId: userId }
    }).then(result => {
        if (result[0] === 0) {
            return res.status(404).json({
                message: "Post not found",
                postId: id
            });
        } else {
            res.status(200).json({
                message: "Post updated successfully",
                post: post
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

function destroy(req, res) {
    const id = req.params.id;
    const userId = 1;

    models.Post.destroy({where: {id: id, userId: userId}}).then(result => {
        if (result) {
            res.status(200).json({
                message: "Post deleted successfully",
                postId: id
            });
        } else {
            return res.status(404).json({
                message: "Post not found",
                postId: id
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });

}

module.exports = {
    index: index,
    save: save,
    show: show,
    update: update,
    destroy: destroy
}