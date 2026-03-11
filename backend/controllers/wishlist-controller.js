import wishlistService from "../services/wishlist-service.js";

async function getAllWishlist(req, res) {
    try {
        const wishlist = await wishlistService.getAllWishlist();
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}

async function getWishlistById(req, res) {
    try {
        const wishlist = await wishlistService.getWishlistById(parseInt(req.params.id));
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
    
}

async function getWishlistByUserId(req, res) {
    try {
        const wishlist = await wishlistService.getWishlistByUserId(parseInt(req.params.userId));
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
    
}

async function getWishlistByBookId(req, res) {
    try {
        const wishlist = await wishlistService.getWishlistByBookId(parseInt(req.params.bookId));
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
    
}

async function createWhishlist(req, res) {
    try {
        const wishlist = await wishlistService.createWhishlist(req.body);
        res.status(201).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
    
}

async function updateWishlist(req, res) {
    try {
        const wishlist = await wishlistService.updateWishlist(parseInt(req.params.id), req.body);
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
    
}

async function deleteWishlist(req, res) {
    try {
        const wishlist = await wishlistService.deleteWishlistById(parseInt(req.params.id), req.user.id);
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
    
}

export default { getAllWishlist, getWishlistById, getWishlistByUserId, getWishlistByBookId, createWhishlist, updateWishlist, deleteWishlist };