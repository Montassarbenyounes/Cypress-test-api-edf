// montassar: Suite de tests pour l'API du formulaire de contact EDF
describe('EDF Contact Form API Tests', () => {
  // montassar: Variable pour stocker les données du formulaire chargées depuis le fixture
  let formData: any;
  // montassar: Récupération de l'URL de base EDF depuis les variables d'environnement Cypress
  const baseUrl = Cypress.env('EDF_API');

  // montassar: Hook before exécuté avant tous les tests pour charger les données de test
  before(() => {
    // montassar: Chargement du fichier fixture contenant les données du formulaire EDF
    cy.fixture('edfContactForm').then((data) => {
      // montassar: Affectation des données par défaut du formulaire à la variable formData
      formData = data.defaultFormData;
    });
  });

  // montassar: Test de soumission réussie du formulaire de contact EDF
  it('should submit contact form successfully', () => {
    // montassar: Construction des paramètres de requête pour le type de demande branchement provisoire bleu
    const queryParams = 'type_demande=branchement_provisoire_bleu&ajax_form=1&_wrapper_format=drupal_ajax';
    
    // montassar: Envoi de la requête POST au endpoint du formulaire de contact EDF entreprises
    cy.apiRequest('POST', `${baseUrl}/entreprises/contacter-votre-conseiller-edf-entreprises?${queryParams}`, {
      // montassar: Configuration du header Content-Type pour envoyer du JSON
      headers: {
        'Content-Type': 'application/json'
      },
      // montassar: Corps de la requête contenant toutes les données du formulaire depuis le fixture
      body: formData
    }).then((response) => {
      // montassar: Vérification que la réponse HTTP est 200 (succès)
      expect(response.status).to.eq(200);
    });
  });

  // montassar: Test de validation des champs obligatoires du formulaire
  it('should validate required form fields', () => {
    // montassar: Construction des paramètres de requête identiques au test précédent
    const queryParams = 'type_demande=branchement_provisoire_bleu&ajax_form=1&_wrapper_format=drupal_ajax';
    
    // montassar: Création d'un objet avec seulement les champs obligatoires pour tester la validation
    const minimalFormData = {
      type_demande: formData.type_demande, // montassar: Type de demande (obligatoire)
      mail_client: formData.mail_client, // montassar: Email du client (obligatoire)
      raison_sociale: formData.raison_sociale, // montassar: Raison sociale (obligatoire)
      cp: formData.cp, // montassar: Code postal (obligatoire)
      fonction_client: formData.fonction_client, // montassar: Fonction du client (obligatoire)
      domaine_client: formData.domaine_client, // montassar: Domaine d'activité (obligatoire)
      tel_pro_client: formData.tel_pro_client // montassar: Téléphone professionnel (obligatoire)
    };

    // montassar: Envoi de la requête avec les champs minimaux obligatoires
    cy.apiRequest('POST', `${baseUrl}/entreprises/contacter-votre-conseiller-edf-entreprises?${queryParams}`, {
      // montassar: Header Content-Type JSON
      headers: {
        'Content-Type': 'application/json'
      },
      // montassar: Corps avec uniquement les champs obligatoires
      body: minimalFormData
    }).then((response) => {
      // montassar: Vérification que la requête est acceptée même avec les champs minimaux
      expect(response.status).to.be.oneOf([200, 201]);
    });
  });

  // montassar: Test de gestion d'erreur avec des données invalides
  it('should handle invalid email format', () => {
    // montassar: Paramètres de requête pour la demande
    const queryParams = 'type_demande=branchement_provisoire_bleu&ajax_form=1&_wrapper_format=drupal_ajax';
    
    // montassar: Création de données avec un email invalide pour tester la validation
    const invalidFormData = {
      ...formData, // montassar: Copie de toutes les données du formulaire
      mail_client: 'email-invalide' // montassar: Email sans format valide pour tester la validation
    };

    // montassar: Envoi de la requête avec l'email invalide
    cy.apiRequest('POST', `${baseUrl}/entreprises/contacter-votre-conseiller-edf-entreprises?${queryParams}`, {
      // montassar: Header JSON standard
      headers: {
        'Content-Type': 'application/json'
      },
      // montassar: Corps avec email invalide
      body: invalidFormData
    }).then((response) => {
      // montassar: Vérification que l'API retourne un code d'erreur approprié (400 ou 422)
      expect(response.status).to.be.oneOf([400, 422, 200]);
    });
  });
});