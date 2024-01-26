import { useEffect } from 'react';

const VendorScripts = () => {
    useEffect(() => {
        // Import JavaScript files
        import('../assets/vendor/apexcharts/apexcharts.min.js');
        import('../assets/vendor/bootstrap/js/bootstrap.bundle.min.js');
        import('../assets/vendor/chart.js/chart.min.js');
        import('../assets/vendor/echarts/echarts.min.js');
        import('../assets/vendor/quill/quill.min.js');
        import('../assets/vendor/simple-datatables/simple-datatables.js');
        import('../assets/vendor/php-email-form/validate.js');

        // Load TinyMCE asynchronously
        import('../assets/vendor/tinymce/tinymce.min.js').then(() => {
            // Import main.js after loading TinyMCE
            import('../assets/js/main.js');
        });

    }, []);

    return null;
}

export default VendorScripts;
