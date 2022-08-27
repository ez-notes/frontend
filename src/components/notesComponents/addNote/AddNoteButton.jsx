import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react';
import AddNote from './AddNoteModal';

const AddNoteButton = () => {
    const [addNoteOpen, setAddNoteOpen] = useState(false)
    
    const close = () => setAddNoteOpen(false)
    const open = () => setAddNoteOpen(true)

    return (
        <h1>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className='button'
                    onClick={() => (addNoteOpen ? close() : open())}
                >
                    Add Note
            </motion.button>
            
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {addNoteOpen && <AddNote addNoteOpen={addNoteOpen} handleClose={close} />}
            </AnimatePresence>


            
        </h1>
    );
};

export default AddNoteButton;