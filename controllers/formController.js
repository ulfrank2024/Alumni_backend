const db = require("../models/db");
const sendConfirmationEmail = require("../emails/confirmationTemplate");

exports.submitForm = async (req, res) => {
    try {
        const {
            name,
            email,
            program,
            field,
            promotionYear,
            residenceCountry,
            currentJob,
            currentCompany,
            teachingQuality,
            skillsUsefulness,
            recommend,
            testimonial,
            willingToTeach,
            teachingFields,
            partnershipSuggestions,
            willingToSupportPartnership,
            abroad,
            certificationIssue,
            certificationSuggestion,
            awardAdmin,
            adminAwardDetails,
            adminAwardType,
            awardAlumni,
            alumniAwardDetails,
            alumniAwardType,
            strengths,
            improvements,
        } = req.body;

        await db.query(
            `INSERT INTO responses 
       (name, email, program, field, promotion_year, residence_country, current_job, current_company,
        teaching_quality, skills_usefulness, recommend, testimonial,
        willing_to_teach, teaching_fields, partnership_suggestions, willing_to_support_partnership,
        abroad, certification_issue, certification_suggestion,
        award_admin, admin_award_details, admin_award_type,
        award_alumni, alumni_award_details, alumni_award_type,
        strengths, improvements)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27)`,
            [
                name,
                email,
                program,
                field,
                promotionYear,
                residenceCountry,
                currentJob,
                currentCompany,
                teachingQuality,
                skillsUsefulness,
                recommend,
                testimonial,
                willingToTeach,
                teachingFields,
                partnershipSuggestions,
                willingToSupportPartnership,
                abroad,
                certificationIssue,
                certificationSuggestion,
                awardAdmin,
                adminAwardDetails,
                adminAwardType,
                awardAlumni,
                alumniAwardDetails,
                alumniAwardType,
                strengths,
                improvements,
            ]
        );

        await sendConfirmationEmail(email, name);

        res.status(200).json({ message: "Formulaire soumis avec succès." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la soumission." });
    }
};
