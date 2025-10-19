const LoadImage = () =>{
    document.getElementById('imageFile').addEventListener('change', function(event) {
        const file = event.target.files[0];
        const preview = document.getElementById('imagePreview');
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            preview.src = '#';
            preview.style.display = 'none';
        }
    });
}

// =================================================================
// SUPABASE UPLOAD LOGIC
// =================================================================

const Send_To_Supabase = () =>{
    document.getElementById('imageForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const supabaseUrl = "https://qktipwezlmrjkezunhnx.supabase.co"
        const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrdGlwd2V6bG1yamtlenVuaG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MzAyOTcsImV4cCI6MjA3NjQwNjI5N30.Kgt5yUFrmKVKK6YoPVSM8Fi-eKkrr_YdahEaGHx5FbQ"
        const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey)
        console.log(supabaseClient)
        console.log("asd")
    });
}


document.addEventListener('DOMContentLoaded', () => {
    LoadImage();
    Send_To_Supabase();
});

// // Function for image preview (Keep this from the previous script)



// document.getElementById('imageForm').addEventListener('submit', async function(e) {
//     e.preventDefault(); // Stop default form submission

//     const statusElement = document.getElementById('statusMessage');
//     const uploadBtn = document.getElementById('uploadBtn');

//     // 1. Get Credentials and Initialize Supabase
//     const supabaseUrl = document.getElementById('supabaseUrl').value;
//     const supabaseAnonKey = document.getElementById('supabaseAnonKey').value;

//     if (!supabaseUrl || !supabaseAnonKey) {
//         statusElement.textContent = 'Error: Please enter Supabase URL and Anon Key.';
//         return;
//     }
    
//     // NOTE: In a real app, you'd initialize this once outside the function.
//     const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

//     // 2. Gather Form Data
//     const imageFile = document.getElementById('imageFile').files[0];
//     const title = document.getElementById('title').value;
//     const description = document.getElementById('description').value;
//     const tags = document.getElementById('tags').value;
    
//     if (!imageFile) {
//         statusElement.textContent = 'Please select an image file.';
//         return;
//     }

//     uploadBtn.disabled = true;
//     statusElement.textContent = 'Uploading file...';
    
//     const BUCKET_NAME = 'photos'; // Replace with your actual bucket name
//     const TABLE_NAME = 'image_entries'; // Replace with your actual table name
    
//     // Create a unique path in Supabase Storage using the current time
//     const filePath = `${Date.now()}_${imageFile.name.replace(/\s/g, '_')}`;

//     try {
//         // 3. Upload File to Supabase Storage
//         const { data: uploadData, error: uploadError } = await supabase.storage
//             .from(BUCKET_NAME)
//             .upload(filePath, imageFile, {
//                 cacheControl: '3600',
//                 upsert: false // Set to true if you want to allow overwriting
//             });

//         if (uploadError) throw uploadError;

//         statusElement.textContent = 'File uploaded successfully. Inserting details...';
        
//         // 4. Get the Public URL
//         const { data: urlData } = supabase.storage
//             .from(BUCKET_NAME)
//             .getPublicUrl(filePath);
            
//         const storage_url = urlData.publicUrl;

//         // 5. Insert Details into Supabase Table
//         const { data: dbData, error: dbError } = await supabase
//             .from(TABLE_NAME)
//             .insert([
//                 { 
//                     title: title,
//                     description: description,
//                     tags: tags,
//                     storage_url: storage_url
//                 }
//             ]);

//         if (dbError) throw dbError;

//         statusElement.textContent = '✅ Image and details successfully stored in Supabase!';
//         document.getElementById('imageForm').reset(); // Clear the form
//         document.getElementById('imagePreview').style.display = 'none'; // Hide preview

//     } catch (error) {
//         statusElement.textContent = `❌ Upload failed: ${error.message}`;
//         // If the database insert fails, you might want to delete the file from storage
//         // This makes the process more robust but adds complexity.
//         console.error('Full Error:', error);
//     } finally {
//         uploadBtn.disabled = false;
//     }
// });