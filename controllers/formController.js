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
            communication,
            activite,
            souvenir,
            conseil,
            agriculture,
            tutore,
            ecole,
            centre,
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
            visionUneep,
            workStudy,
            entrepreneurshipCulture,
        } = req.body;
        

        // 🔍 Vérifier si l'email a déjà été utilisé
        const checkEmail = await db.query(
            `SELECT 1 FROM responses WHERE email = $1`,
            [email]
        );

        if (checkEmail.rows.length > 0) {
            return res
                .status(400)
                .json({ message: "Vous avez déjà soumis ce formulaire." });
        }

        // ✅ Insertion des données
        await db.query(
            `INSERT INTO responses (
              name, email, program, field, promotion_year, residence_country, current_job, current_company,
              teaching_quality, skills_usefulness, recommend, testimonial,
              communication, activite, souvenir, conseil, agriculture, tutore,  ecole, centre,
              willing_to_teach, teaching_fields, partnership_suggestions, willing_to_support_partnership,
              abroad, certification_issue, certification_suggestion,
              award_admin, admin_award_details, admin_award_type,
              award_alumni, alumni_award_details, alumni_award_type,
              strengths, improvements, vision_uneep, work_study, entrepreneurship_culture
            ) VALUES (
              $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,
              $13,$14,$15,$16,$17,$18,$19,
              $20,$21,$22,$23,$24,$25,$26,
              $27,$28,$29,
              $30,$31,$32,
              $33,$34,$35,$36,$37,$38,$39
            )`,
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
                communication,
                activite,
                souvenir,
                conseil,
                agriculture,
                tutore,
                ecole,
                centre,
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
                visionUneep,
                workStudy,
                entrepreneurshipCulture,
            ]
        );
        
        await sendConfirmationEmail(email, name);

        res.status(200).json({ message: "Formulaire soumis avec succès." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la soumission." });
    }
};
exports.getAllResponses = async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM responses ORDER BY id DESC"
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Erreur lors de la récupération des réponses :", error);
        res.status(500).json({
            message: "Erreur lors de la récupération des réponses.",
        });
    }
};
