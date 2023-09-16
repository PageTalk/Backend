DELIMITER //

CREATE FUNCTION InsertQueryAndGetID(
    p_fk_user_id INT,
    p_fk_pdf_id INT,
    p_query_text VARCHAR(255)
)
RETURNS INT
BEGIN
    DECLARE new_query_id INT;
    
    INSERT INTO `query` (fk_user_id, fk_pdf_id, query_text)
    VALUES (p_fk_user_id, p_fk_pdf_id, p_query_text);
    
    SET new_query_id = LAST_INSERT_ID();
    
    RETURN new_query_id;
END //

DELIMITER ;

DELIMITER //

CREATE FUNCTION InsertPDFAndGetID(
    p_fk_user_id INT,
    p_pdf_file VARCHAR(255)
)
RETURNS INT
BEGIN
    DECLARE new_pdf_id INT;
    
    INSERT INTO `pdf` (fk_user_id, pdf_file)
    VALUES (p_fk_user_id, p_pdf_file);
    
    SET new_pdf_id = LAST_INSERT_ID();
    
    RETURN new_pdf_id;
END //

DELIMITER ;
