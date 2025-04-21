import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

export const uploadAttachment = [
    upload.single('file'),
    async (req, res, next) => {
        try {
            if (!req.file) {
                throw new Error('No file uploaded');
            }

            const result = await uploadService.trackUpload(req.file, {
                promotion_id: req.body.promotion_id,
                type: 'attachment',
            });

            res.status(201).json({
                ...result,
                message: 'File uploaded successfully',
            });
        } catch (error) {
            next(error);
        }
    },
];
