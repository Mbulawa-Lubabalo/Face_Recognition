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

const Send_To_Supabase = () => {
  document.getElementById('imageForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const supabaseUrl = "https://qktipwezlmrjkezunhnx.supabase.co";
    const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrdGlwd2V6bG1yamtlenVuaG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MzAyOTcsImV4cCI6MjA3NjQwNjI5N30.Kgt5yUFrmKVKK6YoPVSM8Fi-eKkrr_YdahEaGHx5FbQ"; // keep this secure in production
    const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);

    const imageFile = document.getElementById('imageFile').files[0];
    const name = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const BUCKET_NAME = "images";
    const TABLE_NAME = "ProfileData";

    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    const filename = `${Date.now()}_${imageFile.name.replace(/\s/g, '_')}`;
    const filePath = `public/${filename}`;

    try {
      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabaseClient.storage
        .from(BUCKET_NAME)
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      console.log("File uploaded successfully. Getting public URL...");

      // Get public URL
      const { data: urlData, error: urlError } = supabaseClient
        .storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      if (urlError) throw urlError;

      const image_url = urlData.publicUrl;

      // Insert into DB
      const { data: dbData, error: dbError } = await supabaseClient
        .from(TABLE_NAME)
        .insert([
          {
            name: name,
            description: description,
            image_url: image_url
          }
        ]);

      if (dbError) throw dbError;

      alert("Image and data uploaded successfully!");

    } catch (error) {
      console.error("Unable to upload details:", error.message || error);
      alert("An error occurred. Check console for details.");
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
    LoadImage();
    Send_To_Supabase();
});

